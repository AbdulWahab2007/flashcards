let words = [];
self.addEventListener("install", (event) => {
  console.log("Service Worker Installed");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker Activated");
  self.clients.claim();
});
function showNotification(randomWord) {
  self.registration.showNotification("Reminder!", {
    body: `${randomWord.word}`,
    icon: "/icon.png",
    data: { wordId: randomWord.id },
  });
}

self.addEventListener("message", (event) => {
  if (event.data) {
    if (event.data.type === "SET_DATA") {
      words = event.data.data;
      console.log(event.data.data);
    } else if (event.data.type === "START_NOTIFICATIONS") {
      scheduleNotifications();
    }
  }
});
function getRandomWord() {
  console.log(words);

  if (words.length === 0) {
    return null;
  }
  const randomIndex = Math.floor(Math.random() * words.length);
  const randomWord = words[randomIndex];
  return randomWord;
}

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

async function getLastNotification() {
  const db = await openDB();
  return new Promise((resolve) => {
    const tx = db.transaction("notifications", "readonly");
    const store = tx.objectStore("notifications");
    const request = store.get("lastNotification");
    request.onsuccess = () => resolve(request.result?.timestamp || 0);
  });
}

async function scheduleNotifications() {
  const lastNotification = await getLastNotification();
  const now = Date.now();
  if (now - lastNotification > 40 * 60 * 1000) {
    const randomWord = getRandomWord();
    console.log(randomWord);

    if (randomWord) {
      showNotification(randomWord);
    }
    saveLastNotification();
  }

  setTimeout(scheduleNotifications, 40 * 60 * 1000);
}

scheduleNotifications();

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const wordId = event.notification.data?.wordId;
  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        if (clientList.length > 0) {
          const client = clientList[0];
          client.focus();
          client.postMessage({ type: "NOTIFICATION_CLICK", wordId });
        } else {
          clients.openWindow(`/?wordId=${wordId}`);
        }
      })
  );
});
