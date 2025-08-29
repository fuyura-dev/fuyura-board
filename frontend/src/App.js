import { Routes, Route, Link} from 'react-router-dom';
import HomePage from './pages/HomePage';
import ThreadPage from './pages/ThreadPage';
import NewThreadPage from './pages/NewThreadPage';

function App() {
  return (
    <div>
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/">Home</Link> | {" "}
        <Link to="/new">New Thread</Link> | {" "}
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