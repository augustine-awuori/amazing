import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ApiResponse } from "apisauce";

import { DataError, getCacheData } from "../services/client";
import { EventsContext } from "../contexts";
import { EventFormDataWithDates } from "../data/schemas";
import service, { CreatedEvent, endpoint } from "../services/events";
import storage from "../db/image";
import useData from "./useData";

const useEvents = () => {
  const { data, ...rest } = useData<CreatedEvent>(endpoint);
  const { events, setEvents } = useContext(EventsContext);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    rest.isLoading ? preLoadEvents() : initEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.length]);

  function initEvents() {
    setLoading(true);
    setEvents(data);
    setLoading(false);
  }

  async function preLoadEvents() {
    setLoading(true);
    const data = await getCacheData<CreatedEvent>(endpoint);
    setLoading(false);

    setEvents(data);
  }

  const addEvent = (event: CreatedEvent) => setEvents([event, ...data]);

  const createEvent = async (event: EventFormDataWithDates, image: string) =>
    await service.create({ ...event, image });

  const deleteEvent = async (event: CreatedEvent, onDone?: () => void) => {
    const previous = events;

    toast.loading("Deleting event...");
    setEvents(events.filter((e) => e._id !== event._id));
    const { ok } = await service.deleteEvent(event._id);
    toast.dismiss();

    if (ok) {
      toast.success("Event deleted succcessfully");
      await storage.deleteImage(event.image);
      onDone?.();
    } else {
      setEvents(previous);
      toast.error("Event couldn't be deleted");
    }
  };

  const updateEvent = async (
    event: CreatedEvent
  ): Promise<ApiResponse<unknown, unknown>> => {
    const previous = events;

    toast.loading("Updating event...");
    setEvents(events.map((e) => (e._id === event._id ? event : e)));
    const res = await service.update(event);
    toast.dismiss();

    if (res.ok) {
      toast.success("Event has been updated successfully");
    } else {
      toast.error((res.data as DataError).error || "Something went wrong");
      setEvents(previous);
    }

    return res;
  };

  return {
    addEvent,
    createEvent,
    deleteEvent,
    events: data || events,
    updateEvent,
    error: rest.error,
    isLoading,
    setEvents,
  };
};

export default useEvents;
