import { useEffect, useState } from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

dayjs.extend(relativeTime);

export default (timestamp?: number, withoutSuffix?: boolean) => {
  const [tempTimestamp, setTempTimestamp] = useState(getTimeFromNow(timestamp));

  useEffect(() => {
    setInterval(() => {
      if (timestamp) {
        const time = getTimeFromNow(timestamp);
        if (time !== tempTimestamp) setTempTimestamp(time);
      }
    }, 60_000);
    return () => clearInterval(undefined);
  }, [timestamp]);

  function format(tempTimestamp = "") {
    if (tempTimestamp.includes("a few seconds"))
      return tempTimestamp
        .replace("a few seconds", "just now")
        .replace("in", "");

    if (tempTimestamp.includes("a minute"))
      return tempTimestamp.replace("a minute", "1 m");

    if (tempTimestamp.includes("minutes"))
      return tempTimestamp.replace("minutes", "m");

    if (tempTimestamp.includes("an hour"))
      return tempTimestamp.replace("an hour", "1 h");

    if (tempTimestamp.includes("hours"))
      return tempTimestamp.replace("hours", "h");

    if (tempTimestamp.includes("a month"))
      return tempTimestamp.replace("a month", "1 mo");

    if (tempTimestamp.includes("months"))
      return tempTimestamp.replace("months", "mo");

    if (tempTimestamp.includes("a year"))
      return tempTimestamp.replace("a year", "1 y");

    if (tempTimestamp.includes("years"))
      return tempTimestamp.replace("years", "y");

    if (tempTimestamp.includes("a day"))
      return tempTimestamp.replace("a day", "1 d");

    if (tempTimestamp.includes("days")) {
      const daysOfTheWeek = 7;
      const timestampDays = tempTimestamp.split(" ")[0];
      const days = Number(timestampDays);
      const weeks = (days / daysOfTheWeek).toFixed(0) + " w";

      return days >= daysOfTheWeek
        ? tempTimestamp.replace(timestampDays, weeks).replace("days", "")
        : tempTimestamp.replace("days", "d");
    }

    return tempTimestamp;
  }

  function getTimeFromNow(time?: number) {
    if (time) return format(dayjs(time).fromNow(withoutSuffix));
  }

  const getDate = (timestamp: number) => {
    const date = new Date(timestamp);

    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const month = date.getMonth() + 1;
    const seconds = date.getSeconds();
    const year = date.getFullYear();

    return `${day}/${month}/${year} at ${hours}:${minutes}:${seconds}`;
  };

  return { getDate, getTimeFromNow, tempTimestamp };
};
