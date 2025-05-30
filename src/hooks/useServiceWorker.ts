import { useEffect } from "react";

const useServiceWorker = () => {
    useEffect(() => {
        if ("serviceWorker" in navigator && "Notification" in window) {
            Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                    navigator.serviceWorker.register("/sw.js").then((registration) => {
                        console.log("Service Worker Registered:", registration);
                        navigator.serviceWorker.controller?.postMessage({ type: "START_NOTIFICATIONS" });
                    });
                } else {
                    console.warn("Notification permission denied");
                }
            });
        }
    }, []);
};

export default useServiceWorker;
