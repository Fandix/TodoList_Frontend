import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getTasks, createTask, updateTask, deleteTask } from '../services/todoList/todoListService';
import {
  QueryTaskInput,
  TaskResponse,
  CategoryFilter,
  CompletionFilter,
  PriorityFilter,
  UpdateTaskInput,
  CreateTaskInput,
} from '../model/task_model';
import { TASKS_PER_PAGE } from '../constants';

const TASKS_LIMIT = TASKS_PER_PAGE;

function useTasks() {
  const [tasks, setTasks] = useState<TaskResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [appliedSearch, setAppliedSearch] = useState<string>('');
  const [completionFilter, setCompletionFilter] = useState<CompletionFilter>('all');
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('all');
  const [offset, setOffset] = useState<number>(0);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      const input: QueryTaskInput = {
        offset,
        limit: TASKS_LIMIT,
      };

      if (appliedSearch) input.search = appliedSearch;
      if (activeCategory !== 'all') input.category = activeCategory;
      if (priorityFilter !== 'all') input.priority = priorityFilter;
      if (completionFilter !== 'all') input.completed = completionFilter === 'completed';

      const response = await getTasks(input);
      setTasks(response.list || []);
    } catch (error) {
      console.error(error);
      setErrorMessage((error as Error).message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, [offset, appliedSearch, activeCategory, priorityFilter, completionFilter]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleSearchSubmit = useCallback(() => {
    if (searchQuery !== appliedSearch) {
      setAppliedSearch(searchQuery);
      setOffset(0);
      return;
    }

    if (offset !== 0) {
      setOffset(0);
      return;
    }

    fetchTasks();
  }, [searchQuery, appliedSearch, offset, fetchTasks]);

  const handleCompletionChange = (filter: CompletionFilter) => {
    setCompletionFilter(filter);
    setOffset(0);
  };

  const handleCategoryChange = (category: CategoryFilter) => {
    setActiveCategory(category);
    setOffset(0);
  };

  const handlePriorityChange = (priority: PriorityFilter) => {
    setPriorityFilter(priority);
    setOffset(0);
  };

  const handleNextPage = () => {
    setOffset((prev) => prev + TASKS_LIMIT);
  };

  const handlePrevPage = () => {
    setOffset((prev) => Math.max(prev - TASKS_LIMIT, 0));
  };

  const handleTaskCompleteClick = async (task: TaskResponse) => {
    setErrorMessage('');
    try {
      const params: UpdateTaskInput = {
        id: task.id,
        completed: !task.completed
      }
      await updateTask(params);
      await fetchTasks();
      toast.success(task.completed ? 'Task marked as incomplete' : 'Task completed!');
    } catch (error) {
      console.error(error);
      const errorMsg = (error as Error).message || 'Complete Task failed';
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
    }
  }

  const handleCreateTask = async (input: CreateTaskInput) => {
    setErrorMessage('');
    try {
      await createTask(input);
      await fetchTasks();
      toast.success('Task created successfully!');
    } catch (error) {
      console.error(error);
      const errorMsg = (error as Error).message || 'Failed to create task';
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
      throw error;
    }
  };

  const handleUpdateTask = async (input: UpdateTaskInput) => {
    setErrorMessage('');
    try {
      await updateTask(input);
      await fetchTasks();
      toast.success('Task updated successfully!');
    } catch (error) {
      console.error(error);
      const errorMsg = (error as Error).message || 'Failed to update task';
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
      throw error;
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    setErrorMessage('');
    try {
      await deleteTask({ id: taskId });
      await fetchTasks();
      toast.success('Task deleted successfully!');
    } catch (error) {
      console.error(error);
      const errorMsg = (error as Error).message || 'Failed to delete task';
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
      throw error;
    }
  };

  const canGoPrev = !loading && offset > 0;
  const canGoNext = !loading && tasks.length === TASKS_LIMIT;

  return {
    tasks,
    loading,
    errorMessage,
    setErrorMessage,
    searchQuery,
    setSearchQuery,
    handleSearchSubmit,
    completionFilter,
    handleCompletionChange,
    handleTaskCompleteClick,
    handleCreateTask,
    handleUpdateTask,
    handleDeleteTask,
    activeCategory,
    handleCategoryChange,
    priorityFilter,
    handlePriorityChange,
    currentPage: Math.floor(offset / TASKS_LIMIT),
    handleNextPage,
    handlePrevPage,
    canGoNext,
    canGoPrev,
    refreshTasks: fetchTasks,
  };
}

export default useTasks;
