"use client";

import { useEffect, useState } from "react"; // Import useState

interface NotificationComponentProps {
  words: {
    word: string;
    definition: string;
    tags: Array<string>;
    id: number;
  }[];
}

export default function NotificationComponent({
  words,
}: NotificationComponentProps) {
  const [localPermission, setLocalPermission] =
    useState<NotificationPermission>("default"); // Default permission
  // const { showNotification } = useNotifications();
  // const intervalRef = useRef<NodeJS.Timeout | null>(null);

  console.log(words)

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Only run in the browser
      Notification.requestPermission().then((newPermission) => {
        setLocalPermission(newPermission); // Update local permission
      });
    }
  }, []);

  // useEffect(() => {
  //   if (localPermission === "granted" && words.length > 0) {
  //     if (!intervalRef.current) {
  //       intervalRef.current = setInterval(() => {
  //         const randomIndex = Math.floor(Math.random() * words.length);
  //         const randomWord = words[randomIndex].word;
  //
  //         showNotification("Flashcard Reminder", {
  //           body: `Don't forget to review: ${randomWord}`,
  //         });
  //       }, 10000);
  //     }
  //   } else {
  //     if (intervalRef.current) {
  //       clearInterval(intervalRef.current);
  //       intervalRef.current = null;
  //     }
  //   }
  //
  //   return () => {
  //     if (intervalRef.current) {
  //       clearInterval(intervalRef.current);
  //       intervalRef.current = null;
  //     }
  //   };
  // }, [localPermission, showNotification, words]); // Use localPermission

  return (
    <div>
      {localPermission === "granted" ? (
        <p>Notifications are enabled!</p>
      ) : localPermission === "denied" ? (
        <p>Notifications are blocked.</p>
      ) : (
        <p>Requesting notification permission...</p>
      )}
    </div>
  );
}
