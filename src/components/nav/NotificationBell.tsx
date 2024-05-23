import { BiBell } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

import { IconWithBadge } from "../common";
import { useUser } from "../../hooks";

const NotificationBell = () => {
  const navigate = useNavigate();
  const currentUser = useUser();

  if (!currentUser) return null;

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
