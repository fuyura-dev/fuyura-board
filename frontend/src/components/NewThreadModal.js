import { useState } from 'react';
import axios from 'axios';

function NewThreadModal({ closeModal }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async () => {
        if (!title.trim() || !content.trim()) return;
        await axios.post('http://localhost:3000/thread', { title, content });
        window.location.reload();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Create New Thread</h2>

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
                    rows="4"
                />

                <div className="flex justify-end gap-2">
                    <button
                        onClick={closeModal}
                        className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Post
                    </button>
                </div>
            </div>

        </div>
    )
}

export default NewThreadModal;