import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";

import HomePage from "./pages/HomePage";
import ThreadPage from "./pages/ThreadPage";
import CategoryPage from "./pages/CategoryPage";
import DisclaimerModal from "./components/DisclaimerModal";
import ScrollToTopButton from "./components/ScrollToTopButton";
import NewBoardRequestModal from "./components/NewBoardRequestModal";

import NewThreadPage from "./pages/NewThreadPage";

function App() {
  
  const [showNewBoardModal, setShowNewBoardModal] = useState(false);

  return (
    <>
      <div className="max-w-4xl mx-auto p-4">
        <DisclaimerModal />
        <Link to="/" className="text-3xl font-bold my-2 text-center block">
          Fuyura Board
        </Link>

        <nav className="flex justify-center space-x-4 mb-1">
          <Link
            to="/"
            className="text-white hover:bg-blue-500 bg-blue-400 px-2 py-1 rounded-lg"
          >
            Home
          </Link>
          <button
            onClick={() => setShowNewBoardModal(true)}
            className="text-white hover:bg-green-500 bg-green-400 px-2 py-1 rounded-lg"
          >
            Request a Board
          </button>
        </nav>

        {showNewBoardModal && (
          <NewBoardRequestModal closeModal={() => setShowNewBoardModal(false)} />
        )}

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:code" element={<CategoryPage />} />
          <Route path="/:code/:id" element={<ThreadPage />} />
          {/* <Route path="/new" element={<NewThreadPage />} /> */}
        </Routes>
      </div>
      <ScrollToTopButton />
    </>
  );
}

export default App;
