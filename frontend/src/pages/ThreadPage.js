import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { formatDistanceToNow, set } from "date-fns";
import { Link } from "react-router-dom";

import PaginationControls from "../components/PaginationControls";

function ThreadPage() {
  const { id, code } = useParams();
  const [thread, setThread] = useState(null);
  const [reply, setReply] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/${code}/threads/${id}?page=${page}`)
      .then((res) => {
        setThread(res.data);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => console.error(err));
  }, [id, page, code]);

  const handleReply = async () => {
    if (!reply.trim()) return;
    const res = await axios.post("http://localhost:3000/reply", {
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
  };

  if (!thread)
    return (
      <div className="flex justify-center items-center space-x-2">
        <div className="w-6 h-6 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
        <p className="text-center text-gray-600">Loading...</p>
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex items-center justify-center relative">
        <div className="absolute left-0">
          <Link
            to={`/${code}/thread`}
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
            <p>{p.content}</p>
            <span className="text-xs text-gray-500">
              Posted{" "}
              {formatDistanceToNow(new Date(p.createdAt), { addSuffix: true })}
            </span>
          </div>
        ))}
        <PaginationControls
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />
      </div>

      <div className="p-4 border rounded-lg bg-white shadow">
        <h3 className="font-semibold mb-2">Write a reply</h3>
        <textarea
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          rows="4"
          placeholder="Write your reply..."
        />
        <button
          onClick={handleReply}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Reply
        </button>
      </div>
    </div>
  );
}

export default ThreadPage;
