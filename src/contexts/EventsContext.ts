import { createContext } from "react";

import { CreatedEvent } from "../services/events";

interface Value {
  events: CreatedEvent[];
  setEvents: (events: CreatedEvent[]) => void;
}

export const EventsContext = createContext<Value>({
  events: [],
  setEvents: () => {},
});

EventsContext.displayName = "Events Context";

export default EventsContext;
