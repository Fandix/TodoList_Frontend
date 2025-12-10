import {
  TaskCategories,
  TaskPriority,
  CategoryFilter,
  PriorityFilter,
  CompletionFilter,
} from '../../model/task_model';
import CategorySection from './Category';
import PrioritySection from './Priority';
import './Sidebar.css';

interface SidebarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit: () => void;
  completionFilter: CompletionFilter;
  onCompletionChange: (filter: CompletionFilter) => void;
  activeCategory: CategoryFilter;
  onCategoryChange: (category: CategoryFilter) => void;
  priorityFilter: PriorityFilter;
  onPriorityChange: (priority: PriorityFilter) => void;
  onLogout: () => void;
}

const taskFilterOptions = [
  { label: 'All tasks', value: 'all' as CompletionFilter, icon: 'bi bi-list-task' },
  { label: 'Completed', value: 'completed' as CompletionFilter, icon: 'bi bi-check2-square' },
  { label: 'Uncompleted', value: 'uncompleted' as CompletionFilter, icon: 'bi bi-exclamation-diamond' },
];

function Sidebar({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  completionFilter,
  onCompletionChange,
  activeCategory,
  onCategoryChange,
  priorityFilter,
  onPriorityChange,
  onLogout,
}: SidebarProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearchSubmit();
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Menu</h2>
        <button className="menu-toggle">
          <i className="bi bi-list"></i>
        </button>
      </div>

      <div className="search-container">
        <div className="search-wrapper">
          <i className="bi bi-search"></i>
          <input
            type="text"
            className="search-input"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>

      <div className="menu-section">
        <div className="menu-section-title">Tasks</div>
        {taskFilterOptions.map((option) => (
          <div
            key={option.value}
            className={`menu-item ${completionFilter === option.value ? 'active' : ''}`}
            onClick={() => onCompletionChange(option.value)}
          >
            <div className="menu-item-left">
              <i className={option.icon}></i>
              <span>{option.label}</span>
            </div>
          </div>
        ))}
      </div>

      <CategorySection activeCategory={activeCategory} onCategoryChange={onCategoryChange} />
      <PrioritySection priorityFilter={priorityFilter} onPriorityChange={onPriorityChange} />

      {/* Footer */}
      <div className="sidebar-footer">
        <button className="logout-btn" onClick={onLogout}>
          <i className="bi bi-box-arrow-left"></i>
          <span>Sign out</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
