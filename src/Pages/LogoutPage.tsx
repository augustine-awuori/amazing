import { useEffect } from "react";
import { toast } from "react-toastify";

import auth from "../services/auth";

export default function LogoutPage() {
  useEffect(() => {
    auth.logout();

    toast.success("You're logged out successfully");

    window.location.href = "/";
  }, []);

  return null;
}
