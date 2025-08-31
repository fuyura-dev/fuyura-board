import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import categories from "../config/categories";

function HomePage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Fuyura Boards</h1>

      {categories.map((cat) => (
        <div key={cat.name} className="mb-8">
          <h2 className="text-2x; font-semibold mb-3">{cat.name}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cat.boards.map((board) => (
              <Link
                key={board.code}
                to={`/${board.code}/thread`}
                className="block p-4 bg-gray-100 rounded-xl shadow hover:bg-gray-200 transition"
              >
                <span className="font-bold">/{board.code}/</span> - {board.name}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default HomePage;
