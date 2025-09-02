import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function NewBoardRequestModal({ closeModal }) {
  const [form, setForm] = useState({
    category: "",
    board: "",
    boardCode: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.category || !form.board || !form.boardCode) return;

    try {
      setLoading(true);
      await axios.post("http://localhost:3000/request", form);
      setSuccess(true);
      setForm({ category: "", board: "", boardCode: "", description: "" });
    } catch (err) {
      console.error("Error submitting board request:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 items-center justify-center flex">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold text-center">Request a New Board</h2>
        <Link
          className="text-blue-600 hover:underline block text-center"
          to="/requests"
          onClick={closeModal}
        >
          View Requests Here
        </Link>
        {success ? (
          <div className="text-center">
            <p className="text-green-600 font-medium mb-4">
              Your request has been submitted!
            </p>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <input
                type="text"
                name="category"
                placeholder="Category (e.g. Interests)"
                value={form.category}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Board Name
              </label>
              <input
                type="text"
                name="board"
                placeholder="Board Name (e.g. Technology)"
                value={form.board}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Board Code
              </label>
              <input
                type="text"
                name="boardCode"
                placeholder="Board Code (e.g. /g/)"
                value={form.boardCode}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Optional description..."
                value={form.description}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                rows="3"
              />
            </div>

            <div className="flex justify-center space-x-2">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default NewBoardRequestModal;
