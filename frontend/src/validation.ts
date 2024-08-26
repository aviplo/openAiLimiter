import { z } from "zod";

const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  limit: z
    .number()
    .min(5, { message: "Limit must be greater than 5" })
    .max(100, { message: "Limit must be less than 100" }),
  name: z
    .string()
    .min(3, { message: "Name must be greater than 3 characters" })
    .max(20, { message: "Name must be less than 20 characters" })
    .regex(/^[a-zA-Z\s]*$/, {
      message: "Name can only contain letters and spaces",
    }),
});

export default signInSchema;
