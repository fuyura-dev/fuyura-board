import { useState, useEffect } from "react";
import axios from "axios";

function RequestsPage() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/requests")
      .then((res) => setRequests(res.data))
      .catch((err) => console.error("Error fetching requests:", err));
  }, []);

  const handleUpvote = async (id) => {

  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Board Requests</h2>

      {requests.length === 0 ? (
        <p className="text-gray-500">No Requests</p>
      ) : (
        <div className="space-y-3">
          {requests.map((req) => (
            <div
              key={req.id}
              className="p-3 border rounded-lg shadow bg-white flex items-center justify-between"
            >
              <div>
                <h3 className="font-semibold text-lg">
                  /{req.boardCode}/ - {req.board}
                </h3>
                <p className="text-sm text-gray-600">{req.category}</p>
                {req.description && (
                  <p className="text-sm text-gray-500 mt-1">
                    {req.description}
                  </p>
                )}
              </div>
              <div className="text-center">
                <span className="block text-xl font-bold text-blue-600">
                  {req.votes}
                </span>
                <button
                  onClick={handleUpvote}
                  className="mt-1 px-2 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
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
