import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function HomePage() {
    const [threads, setThreads] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/threads')
        .then(res => setThreads(res.data))
        .catch(err => console.error(err));
    }, []);

    return (
        <>
            <h1 className="text-2xl font-bold text-center mb-4">Threads</h1>

            <div className="space-y-4">
                {threads.map(t => (
                    <div key={t.id} className="p-4 border rounded-lg shadow hover:bg-gray-50">
                        <Link to={`/thread/${t.id}`} className="text-blue-600 font-semibold hover:underline">
                            {t.title}
                        </Link>
                        <p className="text-gray-600 font-light text-sm">{t.posts.length} replies</p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default HomePage;