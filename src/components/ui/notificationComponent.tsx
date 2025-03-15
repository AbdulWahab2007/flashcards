"use client";

import { useEffect, useRef } from "react";
import useNotifications from "../../hooks/useNotifications";

interface NotificationComponentProps {
  words: { word: string; index: number }[]; // Added index to word object
}

export default function NotificationComponent({
  words,
}: NotificationComponentProps) {
  const { showNotification, permission } = useNotifications();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (permission === "granted" && words.length > 0) {
      if (!intervalRef.current) {
        intervalRef.current = setInterval(() => {
          const randomIndex = Math.floor(Math.random() * words.length);
          const randomWord = words[randomIndex].word;
          const wordIndex = words[randomIndex].index; // Get the index

          showNotification("Flashcard Reminder", {
            body: `Don't forget to review: ${randomWord}`,
            data: { wordIndex }, // Include index in notification data
          });
        }, 10000);
      }
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [permission, showNotification, words]);

  return (
    <div>
      {permission === "granted" ? (
        <p>Notifications are enabled!</p>
      ) : permission === "denied" ? (
        <p>Notifications are blocked.</p>
      ) : (
        <p>Requesting notification permission...</p>
      )}
    </div>
  );
}
