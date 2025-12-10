import { TaskResponse } from '../../model/task_model';
import TaskItem from '../TaskItem';
import Pagination from './Pagination';
import './TaskList.css';

interface TaskListProps {
  tasks: TaskResponse[];
  loading: boolean;
  title: string;
  onTaskClick?: (task_id: string) => void;
  onTaskCompleteClick?: (task_id: string) => void;
  onAddTask?: () => void;
  currentPage?: number;
  onNextPage?: () => void;
  onPrevPage?: () => void;
  canGoNext?: boolean;
  canGoPrev?: boolean;
}

function TaskList({
  tasks,
  loading,
  title,
  onTaskClick,
  onTaskCompleteClick,
  onAddTask,
  currentPage = 0,
  onNextPage,
  onPrevPage,
  canGoNext = true,
  canGoPrev = true,
}: TaskListProps) {
  return (
    <div className="task-list-container">
      <div className="content-header">
        <h1>{title}</h1>
        <span className="task-count-badge">{tasks.length}</span>
      </div>

      <button className="add-task-btn" onClick={onAddTask}>
        <i className="bi bi-plus"></i>
        <span>Add New Task</span>
      </button>

      {loading ? (
        <div className="loading">
          <span>Loading tasks...</span>
        </div>
      ) : tasks.length === 0 ? (
        <div className="empty-state">
          <i className="bi bi-clipboard-check"></i>
          <p>No tasks found</p>
        </div>
      ) : (
        <div className="task-list">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} onClick={onTaskClick} onCompletedClick={onTaskCompleteClick}/>
          ))}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        onNextPage={onNextPage}
        onPrevPage={onPrevPage}
        canGoNext={canGoNext}
        canGoPrev={canGoPrev}
      />
    </div>
  );
}

export default TaskList;
