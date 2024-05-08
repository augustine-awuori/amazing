import { BiBell } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

import { IconWithBadge } from "../common";
import auth from "../../services/auth";

const NotificationBell = () => {
  const navigate = useNavigate();

  if (!auth.getCurrentUser()) return null;

  return (
    <IconWithBadge
      display={{ lg: "block", md: "none", base: "none" }}
      Icon={<BiBell />}
      onClick={() => navigate("/notifications")}
      showBadge
      mr={3}
    />
  );
};

export default NotificationBell;
