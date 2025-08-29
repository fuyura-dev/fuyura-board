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
        <div>
            <h1>Threads</h1>
            {threads.map(t => (
                <div key={t.id}>
                    <Link to={`/thread/${t.id}`}>{t.title}</Link>
                    <p>{t.posts.length} replies</p>
                </div>
            ))}
        </div>
    );
}

export default HomePage;