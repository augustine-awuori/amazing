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
