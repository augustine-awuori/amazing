import { useState } from "react";
import { toast } from "react-toastify";

import { CreatedEvent } from "../services/events";
import { DataError } from "../services/client";
import { DatePicker, ImageInputList } from "./common";
import { EventFormData, eventSchema } from "../data/schemas";
import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
  TextAreaField,
} from "./form";
import { useEvents, useForm, useImages } from "../hooks";
import storage from "../db/image";
import notificationsService from "../services/pushNotifications";

interface Props {
  event?: CreatedEvent;
  onDone: () => void;
}

const EventEditForm = ({ event, onDone }: Props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { errors, handleSubmit, register } = useForm(eventSchema);
  const { images, imagesCount, removeAllImages } = useImages(1);
  const [title, setTitle] = useState(event?.title || "");
  const [description, setDescription] = useState(event?.description || "");
  const [fee, setFee] = useState(event?.fee || "");
  const [location, setLocation] = useState(event?.location || "");
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const helper = useEvents();

  const handleStartDateChange = (date: Date) => setStartDate(date);

  const handleEndDateChange = (date: Date) => setEndDate(date);

  const updateEvent = async (info: EventFormData) => {
    if (!event) return;

    setLoading(true);
    const res = await helper.updateEvent({ ...event, ...info });
    setLoading(false);

    if (res.ok) onDone();
  };

  const doSubmit = async (info: EventFormData) => {
    setError("");
    if (event) return updateEvent(info);
    if (!imagesCount) return setError("Please select an image");

    setLoading(true);
    const imageURL = await storage.saveImage(images[0]);
    const eventInfo = { ...info, endsAt: endDate, startsAt: startDate };
    const { data, ok } = await helper.createEvent(eventInfo, imageURL);
    setLoading(false);

    if (ok) {
      toast.success("Event created successfully!");
      removeAllImages();
      onDone();
      helper.addEvent(data as CreatedEvent);
      await notificationsService.notifyAll({
        body: "New Event has just been posted",
        title: "See this new event",
        image: imageURL,
      });
    } else {
      setError((data as DataError)?.error || "Something went wrong");
      await storage.deleteImage(imageURL);
    }
  };

  return (
    <Form handleSubmit={handleSubmit} onSubmit={doSubmit}>
      {!event && <ImageInputList imagesLimit={1} />}
      <ErrorMessage error={error} visible={error} />
      <DatePicker
        label="Starts at"
        selected={startDate}
        onChange={handleStartDateChange}
        startDate={startDate}
        endDate={endDate}
        selectsStart
        minDate={new Date()}
        placeholderText="Select Start Date"
      />
      <DatePicker
        label="Ends at"
        selected={endDate}
        onChange={handleEndDateChange}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        placeholderText="Select End Date"
      />
      <FormField
        error={errors.title}
        label="Title"
        onChangeText={setTitle}
        register={register}
        value={title}
      />
      <FormField
        error={errors.fee}
        label="Fee"
        onChangeText={setFee}
        register={register}
        placeholder="Fee (Put 0 if free)"
        value={fee}
        type="number"
      />
      <TextAreaField
        error={errors.description}
        label="Description"
        onChange={setDescription}
        placeholder="What is the event about?"
        register={register}
        value={description}
      />
      <TextAreaField
        error={errors.location}
        label="Location"
        onChange={setLocation}
        placeholder="Describe the event location"
        register={register}
        value={location}
      />
      <SubmitButton
        label={event ? "Update Event" : "Save Event"}
        isLoading={isLoading}
      />
    </Form>
  );
};

export default EventEditForm;
