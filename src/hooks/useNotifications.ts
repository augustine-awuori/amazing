import { useContext, useEffect } from "react";
import { toast } from "react-toastify";

import { Notification } from "../components/Notification";
import { NotificationsContext } from "../contexts";
import auth from "../services/auth";
import notificationsService from "../services/notifications";

const useNotifications = () => {
  const { notifications, setNotifications } = useContext(NotificationsContext);

  const user = auth.getCurrentUser();

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?._id]);

  const init = async () => {
    const result = await getMyNotifications();
    setNotifications(result);

    if (result.length) toast.info("You've some notifications");
  };

  async function getMyNotifications(): Promise<Notification[]> {
    if (!user) return [];

    const { data, ok } = await notificationsService.get(user._id);

    return ok ? (data as Notification[]) : [];
  }

  return { count: notifications.length, notifications };
};

export default useNotifications;
