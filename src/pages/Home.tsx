import { useNavigate } from 'react-router-dom';
import { logout } from '../services/auth/authService';
import Sidebar from '../components/Sidebar';
import TaskList from '../components/TaskList';
import useTasks from './useTasks';
import './Home.css';

function Home() {
  const navigate = useNavigate();
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

  const handleTaskClick = (task_id: string) => {
    console.log('Task clicked:', task_id);
  };

  const handleTaskCompleteClick = (task_id: string) => {
    console.log('Task completed clicked', task_id);
  }

  const handleAddTask = () => {
    console.log('Add task clicked');
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
        {errorMessage && (
          <div className="error-message">
            <i className="bi bi-exclamation-circle"></i> {errorMessage}
          </div>
        )}

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
    </div>
  );
}

export default Home;
