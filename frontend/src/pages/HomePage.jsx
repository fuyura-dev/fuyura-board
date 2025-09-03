import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function HomePage() {
  const API_URL = process.env.REACT_APP_API_URL;

  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/categories`)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.error(err);
        navigate("/fallback");
      });
  }, [API_URL]);

  if (!categories)
    return (
      <div className="flex justify-center items-center space-x-2">
        <div className="w-6 h-6 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
        <p className="text-center text-gray-600">Loading...</p>
      </div>
    );

  return (
    <div className="p-6">
      <div className="mb-4 border py-4 px-10 rounded-lg border-white bg-blue-200 w-fit text-center mx-auto">
        <h2 className="text-lg font-bold mb-3">General</h2>
        <div className="flex flex-wrap gap-2 mx-auto justify-center">
          <Link
            key="gen"
            to={`/gen`}
            className="block py-1 px-2 bg-gray-100 rounded-xl shadow hover:bg-gray-200 transition"
          >
            <span className="font-bold text-sm">/gen/ - General</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories
          .filter((cat) => cat.name !== "General")
          .map((cat) => (
            <div
              key={cat.id}
              className="border p-4 rounded-lg border-white bg-blue-200"
            >
              <h2 className="text-sm font-semibold mb-3">{cat.name}</h2>
              <div className="flex flex-wrap gap-2">
                {cat.boards.map((board) => (
                  <Link
                    key={board.code}
                    to={`/${board.code}`}
                    className="block py-1 px-2 bg-gray-100 rounded-xl shadow hover:bg-gray-200 transition"
                  >
                    <span className="font-bold text-sm">
                      /{board.code}/ - {board.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default HomePage;
