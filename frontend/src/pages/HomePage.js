import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import NewThreadModal from '../components/NewThreadModal'

function HomePage() {
    const [threads, setThreads] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3000/threads')
        .then(res => setThreads(res.data))
        .catch(err => console.error(err));
    }, []);

    return (
        <div className="max-w-2xl mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Threads</h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    New Thread
                </button>
            </div>

            <div className="space-y-4">
                {threads.map(t => (
                    <div key={t.id} className="p-4 border rounded-lg shadow hover:bg-gray-50">
                    <Link to={`/thread/${t.id}`} className="text-blue-600 font-semibold">
                        {t.title}
                    </Link>
                    <p className="text-sm text-gray-600">{t.posts.length} replies</p>
                    </div>
                ))}
            </div>

            {showModal && (
                <NewThreadModal closeModal={() => setShowModal(false)} />
            )}
        </div>
    );
}

export default HomePage;