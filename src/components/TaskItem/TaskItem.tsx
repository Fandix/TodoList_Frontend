import { TaskResponse } from '../../model/task_model';
import { formatDate, getPriorityMeta, capitalize } from '../../utils';
import './TaskItem.css';

interface TaskItemProps {
  task: TaskResponse;
  onClick?: (task: TaskResponse) => void;
  onCompletedClick?: (task: TaskResponse) => void;
}

function TaskItem({ task, onClick, onCompletedClick }: TaskItemProps) {
  const priorityMeta = getPriorityMeta(task.priority);

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`} onClick={() => onClick?.(task)}>
      <div className="task-item-left">
        <div
          className={`task-checkbox ${task.completed ? 'checked' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onCompletedClick?.(task);
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
              {capitalize(task.category)}
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
