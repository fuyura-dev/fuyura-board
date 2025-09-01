function PaginationControls({ page, totalPages, setPage }) {
  return (
    <div className="flex justify-center gap-2 m-2">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 disabled:hover:bg-gray-200"
      >
        Prev
      </button>
      <span className="px-3 py-1">
        Page {page} of {totalPages}
      </span>
      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 disabled:hover:bg-gray-200"
      >
        Next
      </button>
    </div>
  );
}

export default PaginationControls;
