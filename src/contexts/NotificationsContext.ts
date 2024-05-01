import { createContext } from "react";

import { Notification } from "../components/Notification";

interface ContextValue {
  notifications: Notification[];
  setNotifications: (notifications: Notification[]) => void;
}

const NotificationsContext = createContext<ContextValue>({
  notifications: [],
  setNotifications: () => {},
});

NotificationsContext.displayName = "Notifications Context";

export default NotificationsContext;
