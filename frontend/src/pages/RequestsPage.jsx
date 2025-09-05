import { useState, useEffect } from "react";
import axios from "axios";

function RequestsPage() {
  const API_URL = process.env.REACT_APP_API_URL;

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/requests`)
      .then((res) => setRequests(res.data))
      .catch((err) => console.error("Error fetching requests:", err));
  }, [API_URL]);

  const handleUpvote = async (id) => {
    try {
      const res = await axios.post(`${API_URL}/requests/${id}/upvote`);
      const updatedRequest = res.data;

      setRequests((prev) =>
        prev.map((req) => (req.id === updatedRequest.id ? updatedRequest : req))
      );
    } catch (err) {
      console.error("Error upvoting request:", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Board Requests</h2>

      {requests.length === 0 ? (
        <p className="text-gray-500 text-center">No Requests</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {requests.map((req) => (
            <div
              key={req.id}
              className="px-3 py-2 border rounded-md shadow bg-white flex flex-col justify-between"
            >
              <div>
                <h3 className="font-semibold text-base">
                  /{req.boardCode.replace(/^\/|\/$/g, '')}/ - {req.board}
                </h3>
                <p className="text-xs text-gray-600">{req.category}</p>
                {req.description && (
                  <p className="text-sm text-gray-500 mt-0.5">
                    {req.description}
                  </p>
                )}
              </div>
              <div className="flex flex-col items-center text-sm">
                <span className="text-lg font-bold text-blue-600">
                  {req.votes}
                </span>
                <button
                  onClick={() => handleUpvote(req.id)}
                  className="mt-1 px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Upvote
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RequestsPage;
