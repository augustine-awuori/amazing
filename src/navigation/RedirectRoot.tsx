import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectRoot = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/shops");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default RedirectRoot;
