import './TaskList.css';

interface PaginationProps {
  currentPage: number;
  onNextPage?: () => void;
  onPrevPage?: () => void;
  canGoNext?: boolean;
  canGoPrev?: boolean;
}

function Pagination({
  currentPage,
  onNextPage,
  onPrevPage,
  canGoNext = true,
  canGoPrev = true,
}: PaginationProps) {
  if (!onNextPage && !onPrevPage) {
    return null;
  }

  return (
    <div className="pagination-controls">
      <button
        className="pagination-btn"
        onClick={onPrevPage}
        disabled={!canGoPrev}
        aria-label="Previous page"
      >
        <i className="bi bi-chevron-left"></i>
        <span>Prev</span>
      </button>
      <span className="pagination-info">Page {currentPage + 1}</span>
      <button
        className="pagination-btn"
        onClick={onNextPage}
        disabled={!canGoNext}
        aria-label="Next page"
      >
        <span>Next</span>
        <i className="bi bi-chevron-right"></i>
      </button>
    </div>
  );
}

export default Pagination;
