import { renderHook, act, waitFor } from '@testing-library/react';
import { useTasks } from './useTasks';
import { TaskResponse, TaskPriority, TaskCategories } from '../model/task_model';

const mockToastSuccess = jest.fn();
const mockToastError = jest.fn();
jest.mock('react-hot-toast', () => ({
  __esModule: true,
  default: {
    success: (msg: string) => mockToastSuccess(msg),
    error: (msg: string) => mockToastError(msg),
  },
}));

const mockGetTasks = jest.fn();
const mockCreateTask = jest.fn();
const mockUpdateTask = jest.fn();
const mockDeleteTask = jest.fn();

jest.mock('../services/todoList/todoListService', () => ({
  getTasks: (...args: unknown[]) => mockGetTasks(...args),
  createTask: (...args: unknown[]) => mockCreateTask(...args),
  updateTask: (...args: unknown[]) => mockUpdateTask(...args),
  deleteTask: (...args: unknown[]) => mockDeleteTask(...args),
}));

jest.mock('../constants', () => ({
  TASKS_PER_PAGE: 10,
}));

describe('useTasks', () => {
  const mockTasks: TaskResponse[] = [
    {
      id: '1',
      title: 'Task 1',
      priority: TaskPriority.high,
      completed: false,
      category: TaskCategories.work,
    },
    {
      id: '2',
      title: 'Task 2',
      priority: TaskPriority.medium,
      completed: true,
      category: TaskCategories.personal,
    },
  ];

  const originalConsoleError = console.error;

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetTasks.mockResolvedValue({ list: mockTasks });
    console.error = jest.fn();
  });

  afterEach(() => {
    console.error = originalConsoleError;
  });

  describe('initial state and fetching', () => {
    it('should fetch tasks on mount', async () => {
      renderHook(() => useTasks());

      await waitFor(() => {
        expect(mockGetTasks).toHaveBeenCalled();
      });
    });

    it('should set tasks after fetching', async () => {
      const { result } = renderHook(() => useTasks());

      await waitFor(() => {
        expect(result.current.tasks).toEqual(mockTasks);
      });
    });

    it('should set loading to false after fetching', async () => {
      const { result } = renderHook(() => useTasks());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });
    });
  });

  describe('search', () => {
    it('should update searchQuery', async () => {
      const { result } = renderHook(() => useTasks());

      act(() => {
        result.current.setSearchQuery('test search');
      });

      expect(result.current.searchQuery).toBe('test search');
    });

    it('should trigger search on handleSearchSubmit', async () => {
      const { result } = renderHook(() => useTasks());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      act(() => {
        result.current.setSearchQuery('test');
      });

      mockGetTasks.mockClear();

      await act(async () => {
        result.current.handleSearchSubmit();
      });

      await waitFor(() => {
        expect(mockGetTasks).toHaveBeenCalledWith(
          expect.objectContaining({ search: 'test' })
        );
      });
    });
  });

  describe('filters', () => {
    it('should handle completion filter change', async () => {
      const { result } = renderHook(() => useTasks());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      mockGetTasks.mockClear();

      act(() => {
        result.current.handleCompletionChange('completed');
      });

      expect(result.current.completionFilter).toBe('completed');

      await waitFor(() => {
        expect(mockGetTasks).toHaveBeenCalledWith(
          expect.objectContaining({ completed: true })
        );
      });
    });

    it('should handle category filter change', async () => {
      const { result } = renderHook(() => useTasks());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      mockGetTasks.mockClear();

      act(() => {
        result.current.handleCategoryChange(TaskCategories.work);
      });

      expect(result.current.activeCategory).toBe(TaskCategories.work);

      await waitFor(() => {
        expect(mockGetTasks).toHaveBeenCalledWith(
          expect.objectContaining({ category: TaskCategories.work })
        );
      });
    });

    it('should handle priority filter change', async () => {
      const { result } = renderHook(() => useTasks());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      mockGetTasks.mockClear();

      act(() => {
        result.current.handlePriorityChange(TaskPriority.high);
      });

      expect(result.current.priorityFilter).toBe(TaskPriority.high);

      await waitFor(() => {
        expect(mockGetTasks).toHaveBeenCalledWith(
          expect.objectContaining({ priority: TaskPriority.high })
        );
      });
    });

    it('should reset offset when change page', async () => {
      const { result } = renderHook(() => useTasks());

      act(() => {
        result.current.handleNextPage();
      });

      expect(result.current.currentPage).toBe(1);

      act(() => {
        result.current.handleCategoryChange(TaskCategories.work);
      });

      expect(result.current.currentPage).toBe(0);
    });
  });

  describe('pagination', () => {
    it('should start at page 0', async () => {
      const { result } = renderHook(() => useTasks());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.currentPage).toBe(0);
    });

    it('should go to next page', async () => {
      const { result } = renderHook(() => useTasks());

      act(() => {
        result.current.handleNextPage();
      });

      expect(result.current.currentPage).toBe(1);
    });

    it('should go to previous page', async () => {
      const { result } = renderHook(() => useTasks());

      act(() => {
        result.current.handleNextPage();
        result.current.handleNextPage();
      });

      expect(result.current.currentPage).toBe(2);

      act(() => {
        result.current.handlePrevPage();
      });

      expect(result.current.currentPage).toBe(1);
    });

    it('should not go below page 0', async () => {
      const { result } = renderHook(() => useTasks());

      act(() => {
        result.current.handlePrevPage();
      });

      expect(result.current.currentPage).toBe(0);
    });

    it('should disable prev button on first page', async () => {
      const { result } = renderHook(() => useTasks());
      expect(result.current.canGoPrev).toBe(false);
    });
  });

  describe('task CRUD', () => {
    describe('handleTaskCompleteClick', () => {
      it('should toggle task completion', async () => {
        mockUpdateTask.mockResolvedValueOnce(undefined);
        const { result } = renderHook(() => useTasks());

        await act(async () => {
          await result.current.handleTaskCompleteClick(mockTasks[0]);
        });

        expect(mockUpdateTask).toHaveBeenCalledWith({
          id: '1',
          completed: true,
        });
      });

      it('should show success toast on completion', async () => {
        mockUpdateTask.mockResolvedValueOnce(undefined);
        const { result } = renderHook(() => useTasks());

        await act(async () => {
          await result.current.handleTaskCompleteClick(mockTasks[0]);
        });

        expect(mockToastSuccess).toHaveBeenCalledWith('Task completed!');
      });

      it('should show error toast on failure', async () => {
        mockUpdateTask.mockRejectedValueOnce(new Error('Update failed'));
        const { result } = renderHook(() => useTasks());
        await act(async () => {
          await result.current.handleTaskCompleteClick(mockTasks[0]);
        });

        expect(mockToastError).toHaveBeenCalledWith('Update failed');
      });
    });

    describe('handleCreateTask', () => {
      it('should create a new task', async () => {
        mockCreateTask.mockResolvedValueOnce(undefined);
        const { result } = renderHook(() => useTasks());
        const newTask = {
          title: 'New Task',
          priority: TaskPriority.medium,
          category: 'work',
        };

        await act(async () => {
          await result.current.handleCreateTask(newTask);
        });

        expect(mockCreateTask).toHaveBeenCalledWith(newTask);
        expect(mockToastSuccess).toHaveBeenCalledWith('Task created successfully!');
      });

      it('should refresh tasks after creation', async () => {
        mockCreateTask.mockResolvedValueOnce(undefined);
        const { result } = renderHook(() => useTasks());

        mockGetTasks.mockClear();

        await act(async () => {
          await result.current.handleCreateTask({
            title: 'New Task',
            priority: TaskPriority.medium,
            category: 'work',
          });
        });

        expect(mockGetTasks).toHaveBeenCalled();
      });

      it('should throw error on creation failure', async () => {
        mockCreateTask.mockRejectedValueOnce(new Error('Creation failed'));
        const { result } = renderHook(() => useTasks());

        await expect(
          act(async () => {
            await result.current.handleCreateTask({
              title: 'New Task',
              priority: TaskPriority.medium,
              category: 'work',
            });
          })
        ).rejects.toThrow('Creation failed');
      });
    });

    describe('handleUpdateTask', () => {
      it('should update a task', async () => {
        mockUpdateTask.mockResolvedValueOnce(undefined);
        const { result } = renderHook(() => useTasks());

        const updateInput = {
          id: '1',
          title: 'Updated Task',
        };

        await act(async () => {
          await result.current.handleUpdateTask(updateInput);
        });

        expect(mockUpdateTask).toHaveBeenCalledWith(updateInput);
        expect(mockToastSuccess).toHaveBeenCalledWith('Task updated successfully!');
      });
    });

    describe('handleDeleteTask', () => {
      it('should delete a task', async () => {
        mockDeleteTask.mockResolvedValueOnce(undefined);
        const { result } = renderHook(() => useTasks());

        await act(async () => {
          await result.current.handleDeleteTask('1');
        });

        expect(mockDeleteTask).toHaveBeenCalledWith({ id: '1' });
        expect(mockToastSuccess).toHaveBeenCalledWith('Task deleted successfully!');
      });

      it('should refresh tasks after deletion', async () => {
        mockDeleteTask.mockResolvedValueOnce(undefined);
        const { result } = renderHook(() => useTasks());

        mockGetTasks.mockClear();

        await act(async () => {
          await result.current.handleDeleteTask('1');
        });

        expect(mockGetTasks).toHaveBeenCalled();
      });
    });
  });
});
