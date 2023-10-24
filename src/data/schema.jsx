/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { z } from "zod";

// // Define taskSchema and Task type as in your code
export const customerSchema = z.object({
  id: z.string(),
  last_name: z.string(),
  status: z.string(),
  valid: z.string(),
});
