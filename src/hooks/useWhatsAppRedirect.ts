import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { appBaseUrl } from "../services/client";
import format from "../utils/format";

const useWhatsAppRedirect = (phoneNumber: string | number) => {
  const [url, setUrl] = useState("");
  const location = useLocation();

  const link = format.removeLeadingSlash(location.pathname);

  useEffect(() => {
    setUrl(
      `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${appBaseUrl}${link} .`
    );
  }, [phoneNumber, link]);

  return { url };
};

export default useWhatsAppRedirect;
