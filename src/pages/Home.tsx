import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/auth/authService';
import Sidebar from '../components/Sidebar';
import TaskList from '../components/TaskList';
import TaskModal, { TaskFormData } from '../components/TaskModal';
import useTasks from '../usecases/useTasks';
import './Home.css';
import { CreateTaskInput, TaskResponse, UpdateTaskInput } from '../model/task_model';

function Home() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskResponse | null>(null);

  const {
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
    currentPage,
    handleNextPage,
    handlePrevPage,
    canGoNext,
    canGoPrev,
  } = useTasks();

  const getFilterTitle = () => {
    if (completionFilter === 'completed') return 'Completed';
    if (completionFilter === 'uncompleted') return 'Uncompleted';
    return 'All Tasks';
  };

  const handleLogout = async () => {
    setErrorMessage('');
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error(error);
      setErrorMessage((error as Error).message || 'Logout failed');
    }
  };

  const handleTaskClick = (task: TaskResponse) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleAddTask = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const handleSaveTask = async (taskData: TaskFormData) => {
    const dueDateISO = taskData.dueDate
      ? new Date(taskData.dueDate + 'T00:00:00Z').toISOString()
      : null;

    const baseParams = {
      title: taskData.title,
      description: taskData.description,
      category: taskData.category,
      priority: taskData.priority,
      ...(dueDateISO && { dueDate: dueDateISO }),
    };

    try {
      if (selectedTask) {
        await handleUpdateTask({ id: selectedTask.id, ...baseParams });
      } else {
        await handleCreateTask(baseParams);
      }
      handleCloseModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (taskId: string) => {
    try {
      await handleDeleteTask(taskId);
      handleCloseModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="home-container">
      <Sidebar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
        completionFilter={completionFilter}
        onCompletionChange={handleCompletionChange}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        priorityFilter={priorityFilter}
        onPriorityChange={handlePriorityChange}
        onLogout={handleLogout}
      />

      <main className="main-content">
        <TaskList
          tasks={tasks}
          loading={loading}
          title={getFilterTitle()}
          onTaskClick={handleTaskClick}
          onTaskCompleteClick={handleTaskCompleteClick}
          onAddTask={handleAddTask}
          currentPage={currentPage}
          onNextPage={handleNextPage}
          onPrevPage={handlePrevPage}
          canGoNext={canGoNext}
          canGoPrev={canGoPrev}
        />
      </main>

      <TaskModal
        isOpen={isModalOpen}
        task={selectedTask}
        onClose={handleCloseModal}
        onSave={handleSaveTask}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default Home;
