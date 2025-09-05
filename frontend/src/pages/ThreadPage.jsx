import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

import PaginationControls from "../components/PaginationControls";

function ThreadPage() {
  const API_URL = process.env.REACT_APP_API_URL;

  const { id, code } = useParams();
  const [thread, setThread] = useState(null);
  const [reply, setReply] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_URL}/${code}/threads/${id}?page=${page}`)
      .then((res) => {
        setThread(res.data);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => console.error(err));
  }, [id, page, code, API_URL]);

  const handleReply = async () => {
    if (!reply.trim()) return;
    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/reply`, {
        threadId: parseInt(id),
        content: reply,
      });
      setThread((prev) => ({
        ...prev,
        posts: [...prev.posts, res.data],
        totalPosts: prev.totalPosts + 1,
      }));
      setReply("");
      setPage(totalPages);
    } catch (err) {
      console.error("Error posting reply:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!thread)
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-600 text-sm font-medium">Loading...</p>
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex items-center justify-center relative">
        <div className="absolute left-0">
          <Link
            to={`/${code}`}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            ← Back
          </Link>
        </div>
        <h2 className="text-2xl font-bold bg-gray-100 rounded-lg shadow-md px-3 py-2 text-center">
          {thread.title}
        </h2>
      </div>
      <div className="space-y-3 mb-6">
        <PaginationControls
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />
        {thread.posts.map((p) => (
          <div
            key={p.id}
            className="p-3 border rounded-lg bg-gray-50 shadow-sm"
          >
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>
                <span className="font-medium">Anonymous</span> {}
                <span className="text-gray-500">No. {p.id}</span>
              </span>
              <span className="text-xs text-gray-500">
                Posted{" "}
                {formatDistanceToNow(new Date(p.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>
            <p className="break-words mt-1 text-sm leading-relaxed">
              {p.content}
            </p>
          </div>
        ))}
        {totalPages > 1 && (
          <PaginationControls
            page={page}
            totalPages={totalPages}
            setPage={setPage}
          />
        )}
      </div>

      <div className="p-4 border rounded-lg bg-white shadow">
        <h3 className="font-semibold mb-2">Write a reply</h3>
        <textarea
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          rows="4"
          placeholder="Write your reply..."
          disabled={loading}
        />
        <button
          onClick={handleReply}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Replying..." : "Reply"}
        </button>
      </div>
    </div>
  );
}

export default ThreadPage;
