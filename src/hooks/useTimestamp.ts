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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    return `${date.toDateString()} at ${date.toLocaleTimeString()}`;
  };

  function formatTimestamp(timestamp: string): string {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);

    const formattedDate = `${year}-${month}-${day}`;
    const formattedTime = `${hours}:${minutes}`;

    return `${formattedDate} ${formattedTime}`;
  }

  return { getDate, getTimeFromNow, tempTimestamp, formatTimestamp };
};
