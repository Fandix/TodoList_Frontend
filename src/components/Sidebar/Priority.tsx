import { TaskPriority, PriorityFilter } from '../../model/task_model';

interface PrioritySectionProps {
  priorityFilter: PriorityFilter;
  onPriorityChange: (priority: PriorityFilter) => void;
}

const priorityOptions = [
  { label: 'All priority', value: 'all' as PriorityFilter, icon: 'bi bi-funnel' },
  { label: 'High', value: TaskPriority.high, className: 'high' },
  { label: 'Medium', value: TaskPriority.medium, className: 'medium' },
  { label: 'Low', value: TaskPriority.low, className: 'low' },
];

function PrioritySection({ priorityFilter, onPriorityChange }: PrioritySectionProps) {
  return (
    <div className="menu-section">
      <div className="menu-section-title">Priority</div>
      {priorityOptions.map((option) => (
        <div
          key={option.label}
          className={`menu-item ${priorityFilter === option.value ? 'active' : ''}`}
          onClick={() => onPriorityChange(option.value)}
        >
          <div className="menu-item-left">
            {option.value === 'all' ? (
              <i className={option.icon}></i>
            ) : (
              <span className={`priority-dot ${option.className}`}></span>
            )}
            <span>{option.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PrioritySection;
