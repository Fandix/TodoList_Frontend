import { useState, useEffect } from 'react';
import { TaskResponse, TaskCategories, TaskPriority } from '../../model/task_model';
import { capitalize, getPriorityOptions } from '../../utils';
import './TaskModal.css';

interface TaskModalProps {
  isOpen: boolean;
  task?: TaskResponse | null;
  onClose: () => void;
  onSave: (taskData: TaskFormData) => void;
  onDelete?: (taskId: string) => void;
}

export interface TaskFormData {
  title: string;
  description: string;
  category: TaskCategories;
  priority: TaskPriority;
  dueDate: string;
}

function TaskModal({ isOpen, task, onClose, onSave, onDelete }: TaskModalProps) {
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    category: TaskCategories.personal,
    priority: TaskPriority.medium,
    dueDate: '',
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        category: (task.category as TaskCategories) || TaskCategories.personal,
        priority: task.priority || TaskPriority.medium,
        dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
      });
    } else {
      setFormData({
        title: '',
        description: '',
        category: TaskCategories.personal,
        priority: TaskPriority.medium,
        dueDate: '',
      });
    }
  }, [task, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleDelete = () => {
    if (task?.id && onDelete) {
      onDelete(task.id);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Task</h2>
          <button className="modal-close-btn" onClick={onClose}>
            <i className="bi bi-x"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Renew driver's license"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Add task description..."
              rows={4}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">List</label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as TaskCategories })}
              >
                {Object.values(TaskCategories).map((category) => (
                  <option key={category} value={category}>
                    {capitalize(category)}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <select
                id="priority"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: Number(e.target.value) as TaskPriority })}
              >
                {getPriorityOptions().map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="dueDate">Due date</label>
            <input
              type="date"
              id="dueDate"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            />
          </div>

          <div className="modal-actions">
            {task && onDelete && (
              <button type="button" className="delete-btn" onClick={handleDelete}>
                Delete Task
              </button>
            )}
            <button type="submit" className="save-btn">
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskModal;
