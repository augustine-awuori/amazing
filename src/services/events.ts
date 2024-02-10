import { RSVPFormData } from "../components/RSVPForm";
import { EventFormDataWithDates } from "../data/schemas";
import { User } from "../hooks/useUser";
import client from "./client";

export const endpoint = "/events";

export interface NewEvent extends EventFormDataWithDates {
  image: string;
}

export interface CreatedEvent extends NewEvent {
  _id: string;
  author: User;
  timestamp: number;
  turnOut: RSVPFormData[];
  bookmarks?: { [id: string]: string };
  startsAt: string;
  endsAt: string;
}

const create = (event: NewEvent) => client.post(endpoint, event);

const deleteEvent = (eventId: string) =>
  client.delete(`${endpoint}/${eventId}`);

const getEvents = () => client.get(endpoint);

const update = (event: CreatedEvent) =>
  client.put(`${endpoint}/${event._id}`, event);

const rsvp = (eventId: string, user: RSVPFormData) =>
  client.patch(`${endpoint}/${eventId}`, user);

export default { create, deleteEvent, getEvents, rsvp, update };
