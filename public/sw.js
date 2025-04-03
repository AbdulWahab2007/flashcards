let words = [];
self.addEventListener("install", (event) => {
  console.log("Service Worker Installed");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker Activated");
  self.clients.claim();
});
// Function to show notification
function showNotification(randomWord) {
  self.registration.showNotification("Reminder!", {
    body: `${randomWord}`,
    icon: "/icon.png",
  });
}

// Listen for messages from the app
self.addEventListener("message", (event) => {
  if (event.data) {
    if (event.data.type === "SET_DATA") {
      words = event.data.data; // Store the passed data
    } else if (event.data.type === "START_NOTIFICATIONS") {
      scheduleNotifications();
    }
  }
});
function getRandomWord() {
  if (words.length === 0) {
    return null; // If no words in localStorage
  }
  const randomIndex = Math.floor(Math.random() * words.length);
  const randomWord = words[randomIndex];
  return randomWord;
}

// Open IndexedDB
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("NotificationDB", 1);
    request.onerror = (event) => reject(event.target.error);
    request.onsuccess = (event) => resolve(event.target.result);
    request.onupgradeneeded = (event) => {
      event.target.result.createObjectStore("notifications", { keyPath: "id" });
    };
  });
}

async function saveLastNotification() {
  const db = await openDB();
  const tx = db.transaction("notifications", "readwrite");
  const store = tx.objectStore("notifications");
  store.put({ id: "lastNotification", timestamp: Date.now() });
  await tx.complete;
}

// Get last notification timestamp
async function getLastNotification() {
  const db = await openDB();
  return new Promise((resolve) => {
    const tx = db.transaction("notifications", "readonly");
    const store = tx.objectStore("notifications");
    const request = store.get("lastNotification");
    request.onsuccess = () => resolve(request.result?.timestamp || 0);
  });
}

// Schedule notifications intelligently
async function scheduleNotifications() {
  const lastNotification = await getLastNotification();
  const now = Date.now();
  const interval = 40;
  if (now - lastNotification > 10000) {
    // console.log(words[1].word);

    const randomWord = getRandomWord();
    // console.log(randomWord);

    if (randomWord) {
      showNotification(randomWord.word);
    }
    saveLastNotification();
  }

  setTimeout(scheduleNotifications, 10000);
}

scheduleNotifications();
