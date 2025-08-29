import { Routes, Route, Link} from 'react-router-dom';
import HomePage from './pages/HomePage';
import ThreadPage from './pages/ThreadPage';
import NewThreadPage from './pages/NewThreadPage';

function App() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold my-4 text-center">Fuyura Board</h1>
      
      <nav className="flex justify-center space-x-4 mb-6">
        <Link to="/" className="text-blue-600 hover:underline">Home</Link>
        <Link to="/new" className="text-blue-600 hover:underline">New Thread</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/thread/:id" element={<ThreadPage />} />
        <Route path="/new" element={<NewThreadPage />} />
      </Routes>

    </div>
  );
}

export default App;