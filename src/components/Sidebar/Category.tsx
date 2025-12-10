import { TaskCategories, CategoryFilter } from '../../model/task_model';

interface CategorySectionProps {
  activeCategory: CategoryFilter;
  onCategoryChange: (category: CategoryFilter) => void;
}

const categoryOptions: Array<{
  label: string;
  value: CategoryFilter;
  className?: string;
  icon?: string;
}> = [
  { label: 'All categories', value: 'all', icon: 'bi bi-card-list' },
  { label: 'Personal', value: TaskCategories.personal, className: 'personal' },
  { label: 'Work', value: TaskCategories.work, className: 'work' },
  { label: 'Shopping', value: TaskCategories.shopping, className: 'shopping' },
  { label: 'Health', value: TaskCategories.health, className: 'health' },
  { label: 'Other', value: TaskCategories.other, className: 'other' },
];

function CategorySection({ activeCategory, onCategoryChange }: CategorySectionProps) {
  return (
    <div className="menu-section">
      <div className="menu-section-title">Category</div>
      {categoryOptions.map((category) => (
        <div
          key={category.value}
          className={`menu-item ${activeCategory === category.value ? 'active' : ''}`}
          onClick={() => onCategoryChange(category.value)}
        >
          <div className="menu-item-left">
            {category.icon ? (
              <i className={category.icon}></i>
            ) : (
              <span className={`category-dot ${category.className}`}></span>
            )}
            <span>{category.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CategorySection;
