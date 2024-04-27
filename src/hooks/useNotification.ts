import { useEffect, useState } from "react";

import { backendURL } from "../services/client";

interface Notification {
  title: string;
  message: string;
}

const useNotification = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const ws = new WebSocket(`wss://${backendURL}`);

    ws.onmessage = (event) => {
      const notification: Notification = JSON.parse(event.data);
      setNotifications((prev) => [...prev, notification]);
    };

    return () => ws.close();
  }, []);

  return { notifications };
};

export default useNotification;
