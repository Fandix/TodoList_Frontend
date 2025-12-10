import { useCallback, useEffect, useState } from 'react';
import { get_tasks } from '../services/todoList/todoListService';
import {
  TaskInput,
  TaskResponse,
  CategoryFilter,
  CompletionFilter,
  PriorityFilter,
} from '../model/task_model';

const TASKS_LIMIT = 50;

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
      const input: TaskInput = {
        offset,
        limit: TASKS_LIMIT,
      };

      if (appliedSearch) input.search = appliedSearch;
      if (activeCategory !== 'all') input.category = activeCategory;
      if (priorityFilter !== 'all') input.priority = priorityFilter;
      if (completionFilter !== 'all') input.completed = completionFilter === 'completed';

      const response = await get_tasks(input);
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
    setOffset((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setOffset((prev) => Math.max(prev - 1, 0));
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
    activeCategory,
    handleCategoryChange,
    priorityFilter,
    handlePriorityChange,
    currentPage: offset,
    handleNextPage,
    handlePrevPage,
    canGoNext,
    canGoPrev,
  };
}

export default useTasks;
