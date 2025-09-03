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
      <div className="flex justify-center items-center space-x-2">
        <div className="w-6 h-6 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
        <p className="text-center text-gray-600">Loading...</p>
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto p-1">
      <div className="flex justify-between items-center">
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
        {threads.map((t) => (
          <Link
            key={t.id}
            to={`/${code}/${t.id}`}
            className="block px-3 py-1 border rounded-lg shadow hover:bg-gray-50 bg-sky-100"
          >
            <div>
              <h2 className="text-blue-600 font-semibold text-xl">
                {t.title}{" "}
                <span
                  className="text-gray-600 font-normal"
                  style={{ fontSize: "0.7rem" }}
                >
                  {" - "}
                  {t.posts.length} replies - Last updated{" "}
                  {formatDistanceToNow(new Date(t.updatedAt), {
                    addSuffix: true,
                  })}
                </span>
              </h2>
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
            </div>
          </Link>
        ))}
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
