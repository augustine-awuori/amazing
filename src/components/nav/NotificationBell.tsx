import { BiBell } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

import { IconwithBadge } from "../common";
import auth from "../../services/auth";

const NotificationBell = () => {
  const navigate = useNavigate();

  if (!auth.getCurrentUser()) return null;

  return (
    <IconwithBadge
      Icon={<BiBell />}
      onClick={() => navigate("/notifications")}
      showBadge
    />
  );
};

export default NotificationBell;
