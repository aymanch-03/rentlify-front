/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { z } from "zod";

// Define taskSchema and Task type as in your code
export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
});
