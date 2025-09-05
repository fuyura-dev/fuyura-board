import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

import NewThreadModal from "../components/NewThreadModal";
import PaginationControls from "../components/PaginationControls";

function CategoryPage() {
  const API_URL = process.env.REACT_APP_API_URL;

  const { code } = useParams();
  const [threads, setThreads] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [board, setBoard] = useState(null);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    if (showModal) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [showModal]);

  useEffect(() => {
    axios
      .get(`${API_URL}/${code}/threads?page=${page}`)
      .then((res) => {
        setThreads(res.data.threads);
        setTotalPages(res.data.totalPages);
        setBoard(res.data.board);
        if (res.data.limit) setLimit(res.data.limit);
      })
      .catch((err) => console.error(err));
  }, [code, page, API_URL]);

  const showBottomPagination = totalPages > 1 && threads.length === limit;

  if (!board)
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-600 text-sm font-medium">Loading...</p>
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto p-1">
      <div className="flex justify-between items-center mb-2">
        {board && (
          <h2 className="text-xl font-bold">
            /{board.code}/ - {board.name}
          </h2>
        )}
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          New Thread
        </button>
      </div>

      {totalPages > 1 && (
        <PaginationControls
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />
      )}

      <div className="space-y-2">
        {threads.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-center space-y-3">
            <p className="text-lg font-semibold text-gray-700">
              No threads yet
            </p>
            <p className="text-sm text-gray-500">
              Be the first to start a conversation by creating a new thread.
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create Thread
            </button>
          </div>
        ) : (
          threads.map((t) => (
            <Link
              key={t.id}
              to={`/${code}/${t.id}`}
              className="block px-3 py-1 border rounded-lg shadow hover:bg-gray-50 bg-sky-100"
            >
              <div className="flex items-center justify-between text-sm mb-1 text-gray-600">
                <span>
                  <span className="font-medium text-black">No. {t.id}</span> {}
                  <span className="text-blue-600 font-semibold">{t.title}</span>
                </span>
                <span className="text-xs">
                  {t._count.posts} replies - Last Updated{" "}
                  {formatDistanceToNow(new Date(t.updatedAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>
              <div>
                {t.posts.map((p) => (
                  <p
                    key={p.id}
                    className="text-gray-700 truncate"
                    style={{ fontSize: "0.8rem" }}
                    title={p.content}
                  >
                    {"- "}
                    {p.content}
                  </p>
                ))}
              </div>
            </Link>
          ))
        )}
      </div>

      {showModal && <NewThreadModal closeModal={() => setShowModal(false)} />}

      {showBottomPagination && (
        <PaginationControls
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />
      )}
    </div>
  );
}

export default CategoryPage;
