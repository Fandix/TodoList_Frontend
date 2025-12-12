import { render, screen, fireEvent } from '@testing-library/react';
import TaskItem from './TaskItem';
import { TaskResponse, TaskPriority, TaskCategories } from '../../model/task_model';

describe('TaskItem', () => {
  const mockTask: TaskResponse = {
    id: '1',
    title: 'Test Task',
    priority: TaskPriority.medium,
    completed: false,
    category: TaskCategories.work,
    description: 'Test description',
    dueDate: '2024-12-25',
  };

  it('should render task title', () => {
    render(<TaskItem task={mockTask} />);
    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });

  it('should render priority label', () => {
    render(<TaskItem task={mockTask} />);
    expect(screen.getByText('Medium')).toBeInTheDocument();
  });

  it('should render category', () => {
    render(<TaskItem task={mockTask} />);
    expect(screen.getByText('Work')).toBeInTheDocument();
  });

  it('should render formatted due date', () => {
    render(<TaskItem task={mockTask} />);
    // The date format is MM/DD/YY
    expect(screen.getByText(/12\/25\/24/)).toBeInTheDocument();
  });

  it('should call onClick when task item is clicked', () => {
    const onClick = jest.fn();
    render(<TaskItem task={mockTask} onClick={onClick} />);

    // eslint-disable-next-line testing-library/no-node-access
    const taskElement = document.querySelector('.task-item');
    fireEvent.click(taskElement!);

    expect(onClick).toHaveBeenCalledWith(mockTask);
  });

  it('should call onCompletedClick when checkbox is clicked', () => {
    const onCompletedClick = jest.fn();
    render(<TaskItem task={mockTask} onCompletedClick={onCompletedClick} />);

    // eslint-disable-next-line testing-library/no-node-access
    const checkbox = document.querySelector('.task-checkbox');
    fireEvent.click(checkbox!);

    expect(onCompletedClick).toHaveBeenCalledWith(mockTask);
  });

  it('should not trigger onClick when checkbox is clicked', () => {
    const onClick = jest.fn();
    const onCompletedClick = jest.fn();
    render(
      <TaskItem
        task={mockTask}
        onClick={onClick}
        onCompletedClick={onCompletedClick}
      />
    );

    // eslint-disable-next-line testing-library/no-node-access
    const checkbox = document.querySelector('.task-checkbox');
    fireEvent.click(checkbox!);

    expect(onCompletedClick).toHaveBeenCalled();
    expect(onClick).not.toHaveBeenCalled();
  });

  it('should have completed class when task is completed', () => {
    const completedTask = { ...mockTask, completed: true };
    render(<TaskItem task={completedTask} />);
    // eslint-disable-next-line testing-library/no-node-access
    const taskElement = document.querySelector('.task-item');
    expect(taskElement).toHaveClass('completed');
  });

  it('should show check icon when task is completed', () => {
    const completedTask = { ...mockTask, completed: true };
    render(<TaskItem task={completedTask} />);
    // eslint-disable-next-line testing-library/no-node-access
    const checkIcon = document.querySelector('.bi-check');
    expect(checkIcon).toBeInTheDocument();
  });

  it('should not show check icon when task is not completed', () => {
    render(<TaskItem task={mockTask} />);
    // eslint-disable-next-line testing-library/no-node-access
    const checkIcon = document.querySelector('.bi-check');
    expect(checkIcon).not.toBeInTheDocument();
  });

  it('should render different priority levels correctly', () => {
    const lowPriorityTask = { ...mockTask, priority: TaskPriority.low };
    const { rerender } = render(<TaskItem task={lowPriorityTask} />);
    expect(screen.getByText('Low')).toBeInTheDocument();

    const highPriorityTask = { ...mockTask, priority: TaskPriority.high };
    rerender(<TaskItem task={highPriorityTask} />);
    expect(screen.getByText('High')).toBeInTheDocument();
  });

  it('should not render due date when not provided', () => {
    const taskWithoutDueDate = { ...mockTask, dueDate: undefined };
    render(<TaskItem task={taskWithoutDueDate} />);
    // eslint-disable-next-line testing-library/no-node-access
    const calendarIcon = document.querySelector('.bi-calendar');
    expect(calendarIcon).not.toBeInTheDocument();
  });
});
