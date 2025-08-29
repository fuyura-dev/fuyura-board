import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function NewThreadPage() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (!title.trim() || !content.trim()) return;
        await axios.post('http://localhost:3000/thread', { title, content });
        navigate('/');
    };

    return (
        <div className="max-w-lg max-auto p-6 bg-white shadow rounded-lg mx-auto">
            <h2 className="text-2xl font-bold mb-4">Create New Thread</h2>

            <input
                type="text"
                placeholder="Thread title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full p-2 border rounded-lg mb-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <textarea
                placeholder="Write your first post..."
                value={content}
                onChange={e => setContent(e.target.value)}
                className="w-full p-2 border rounded-lg mb-3 focus:ring-2 focus:ring-blue-500 outline-none"
                rows="5"
            />

            <button
                onClick={handleSubmit}
                className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
            >
                Create Thread
            </button>
        </div>
    )

}

export default NewThreadPage;