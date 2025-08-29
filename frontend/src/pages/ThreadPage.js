import { useState, useEffect } from 'react';
import {useParams } from 'react-router-dom';
import axios from 'axios';

function ThreadPage () {
    const { id } = useParams();
    const [thread, setThread] = useState(null);
    const [reply, setReply] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3000/threads')
        .then(res => {
            const t = res.data.find(th => th.id === parseInt(id));
            setThread(t);
        });
    }, [id]);

    const handleReply = async () => {
        await axios.post('http://localhost:3000/reply', { threadId: parseInt(id), content: reply });
        window.location.reload();
    };

    if (!thread) return <p>Loading...</p>;

    return (
        <div>
            <h2>{thread.title}</h2>
            {thread.posts.map(p => (
                <p key={p.id}>{p.content}</p>
            ))}

            <textarea value={reply} onChange={(e) => setReply(e.target.value)} />
            <button onClick={handleReply}>Reply</button>
        </div>
    );
}

export default ThreadPage;