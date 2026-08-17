// Provides previous and next buttons for chaing results page
function Pagination({ page, onPrevious, onNext }) {
  return (
    <div className="pagination">
      <button
        onClick={onPrevious}

        // Prevents the user from going before page one
        disabled={page === 0}
      >
        Previous
      </button>

      <span>Page {page + 1}</span>

      <button onClick={onNext}>
        Next
      </button>
    </div>
  );
}

export default Pagination;