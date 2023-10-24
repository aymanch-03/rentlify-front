/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const { z } = require('zod');

// Define taskSchema and Task type as in your code
export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
});

// Define Task type using taskSchema
// eslint-disable-next-line react-refresh/only-export-components
const Task = taskSchema.infer();

// Example usage:
const task = {
  id: '1',
  title: 'Sample Task',
  status: 'todo',
  label: 'feature',
  priority: 'medium',
};

console.log(task); // Task object
