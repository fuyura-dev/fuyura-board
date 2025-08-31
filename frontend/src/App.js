import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ThreadPage from "./pages/ThreadPage";
import CategoryPage from "./pages/CategoryPage";

import NewThreadPage from "./pages/NewThreadPage";

function App() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <Link to="/" className="text-3xl font-bold my-4 text-center block">
        Fuyura Board
      </Link>

      <nav className="flex justify-center space-x-4 mb-6">
        <Link
          to="/"
          className="text-white hover:bg-blue-500 bg-blue-400 px-2 py-1 rounded-lg"
        >
          Home
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:code/thread" element={<CategoryPage />} />
        <Route path="/:code/thread/:id" element={<ThreadPage />} />
        <Route path="/new" element={<NewThreadPage />} />
      </Routes>
    </div>
  );
}

export default App;
