import { useState, useEffect } from "react";

const useNotifications = () => {
  const [permission, setPermission] = useState(Notification.permission);

  useEffect(() => {
    Notification.requestPermission().then((newPermission) => {
      setPermission(newPermission);
    });
  }, []);

  const showNotification = (title: string, options: object) => {
    if (permission === "granted") {
      new Notification(title, options);
    } else if (permission === "default") {
      Notification.requestPermission().then((newPermission) => {
        setPermission(newPermission);
        if (newPermission === "granted") {
          new Notification(title, options);
        }
      });
    }
  };

  return { showNotification, permission };
};

export default useNotifications;
