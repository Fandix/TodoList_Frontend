import { TaskPriority } from '../model/task_model';

export interface PriorityMeta {
  label: string;
  className: 'low' | 'medium' | 'high';
}

/**
 * Get priority metadata for display
 */
export const getPriorityMeta = (priority: TaskPriority): PriorityMeta => {
  switch (priority) {
    case TaskPriority.low:
      return { label: 'Low', className: 'low' };
    case TaskPriority.medium:
      return { label: 'Medium', className: 'medium' };
    case TaskPriority.high:
      return { label: 'High', className: 'high' };
    default:
      return { label: 'High', className: 'high' };
  }
};

/**
 * Get all priority options for select dropdowns
 */
export const getPriorityOptions = () => [
  { value: TaskPriority.low, label: 'Low' },
  { value: TaskPriority.medium, label: 'Medium' },
  { value: TaskPriority.high, label: 'High' },
];
