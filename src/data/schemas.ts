import { z } from "zod";

export const shopSchema = z.object({
  name: z.string().min(3, "Name should be between 3 & 50 chars").max(50),
  location: z
    .string()
    .min(3, "Location description should be btn 3 & 255 chars")
    .max(255),
  type: z.string().min(2),
});

export type ShopFormData = z.infer<typeof shopSchema>;

export const productSchema = z.object({
  name: z.string().min(1, "Name should be between 1 and 50 characters").max(50),
  price: z
    .string()
    .min(1, "Price should be between Ksh 1 and  Ksh 1M")
    .max(1000000),
  description: z.string(),
});

export type ProductFormData = z.infer<typeof productSchema>;

export const listingSchema = z.object({
  title: z
    .string()
    .min(1, "Title should be between 1 and 50 characters")
    .max(50),
  price: z
    .string()
    .min(1, "Price should be between Ksh 1 and  Ksh 1M")
    .max(1_000_000),
  description: z.string(),
  category: z.string().min(5),
  images: z.any(),
});

export type ListingFormData = z.infer<typeof listingSchema>;

export const requestSchema = z.object({
  category: z.string().min(5),
  description: z.string().min(6).max(100),
  title: z.string().min(4).max(50),
});

export type RequestFormData = z.infer<typeof requestSchema>;

export const profileEditSchema = z.object({
  instagram: z.string(),
  name: z.string().min(3, "Name must be at least 3 characters").max(30),
  twitter: z.string(),
  username: z.string().min(3, "Username must be at least 3 characters").max(20),
  whatsapp: z
    .string()
    .min(12, "WhatsApp number should be either 12 or 13 characters")
    .max(13),
  youtube: z.string(),
});

export type ProfileEditFormData = z.infer<typeof profileEditSchema>;

export const eventSchema = z.object({
  description: z
    .string()
    .min(5, "Event description should be at least 5 chars"),
  title: z.string().min(3, "Event title should be at least 3 & 50 chars"),
  fee: z.string().min(1, "Add a min fee of Ksh 0 if it's free. 10, 000 max"),
  location: z.string().min(3, "Event location should be at least 3 chars"),
});

export type EventFormData = z.infer<typeof eventSchema>;

export interface EventFormDataWithDates extends EventFormData {
  startsAt: Date | string;
  endsAt: Date | string;
}
