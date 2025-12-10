import { TaskResponse } from '../../model/task_model';
import './TaskItem.css';

interface TaskItemProps {
  task: TaskResponse;
  onClick?: (id: string) => void;
  onCompletedClick?: (id: string) => void;
}

function TaskItem({ task, onClick, onCompletedClick }: TaskItemProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit' });
  };

  const getPriorityMeta = () => {
    switch (task.priority) {
      case 1:
        return { label: 'Low', className: 'low' };
      case 2:
        return { label: 'Medium', className: 'medium' };
      default:
        return { label: 'High', className: 'high' };
    }
  };

  const priorityMeta = getPriorityMeta();

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`} onClick={() => onClick?.(task.id)}>
      <div className="task-item-left">
        <div
          className={`task-checkbox ${task.completed ? 'checked' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onCompletedClick?.(task.id);
          }}
        >
          {task.completed && <i className="bi bi-check"></i>}
        </div>
        <span className="task-title">{task.title}</span>
      </div>
      <div className="task-item-right">
        <div className="task-meta">
          {task.dueDate && (
            <span className="task-date">
              <i className="bi bi-calendar"></i>
              {formatDate(task.dueDate)}
            </span>
          )}
          {task.category && (
            <span className={`task-category-tag ${task.category}`}>
              {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
            </span>
          )}
          {priorityMeta && (
            <span className={`task-priority ${priorityMeta.className}`}>
              <span className="task-priority-indicator"></span>
              {priorityMeta.label}
            </span>
          )}
        </div>
        <i className="bi bi-chevron-right task-arrow"></i>
      </div>
    </div>
  );
}

export default TaskItem;
