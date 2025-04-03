"use client";

import { useEffect, useState } from "react"; // Import useState
export default function NotificationComponent() {
  const [localPermission, setLocalPermission] =
    useState<NotificationPermission>("default");

  useEffect(() => {
    if (typeof window !== "undefined") {
      Notification.requestPermission().then((newPermission) => {
        setLocalPermission(newPermission);
      });
    }
  }, []);
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
