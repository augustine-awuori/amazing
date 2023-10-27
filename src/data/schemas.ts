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
});

export type ListingFormData = z.infer<typeof listingSchema>;

export const requestSchema = z.object({
  category: z.string().min(5),
  description: z.string().min(6).max(100),
  title: z.string().min(4).max(50),
});

export type RequestFormData = z.infer<typeof requestSchema>;
