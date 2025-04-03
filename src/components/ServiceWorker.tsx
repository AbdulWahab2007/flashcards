"use client";

import { useEffect } from "react";

const ServiceWorker = () => {
  useEffect(() => {
    if ("serviceWorker" in navigator && "Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          navigator.serviceWorker.register("/sw.js").then((registration) => {
            console.log("Service Worker Registered:", registration);

            // Send localStorage data to service worker
            const storedData = localStorage.getItem("words");
            if (storedData) {
              const parsedWords = JSON.parse(storedData);
              //   console.log(parsedWords);

              navigator.serviceWorker.ready.then((sw) => {
                sw.active?.postMessage({ type: "SET_DATA", data: parsedWords });
              });
            }

            // Start notifications
            navigator.serviceWorker.controller?.postMessage({
              type: "START_NOTIFICATIONS",
            });
          });
        } else {
          console.warn("Notification permission denied");
        }
      });
    }
  }, []);

  return null;
};

export default ServiceWorker;
