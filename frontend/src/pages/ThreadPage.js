import { useState, useEffect } from 'react';
import {useParams } from 'react-router-dom';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';

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
        if (!reply.trim()) return;
        await axios.post('http://localhost:3000/reply', { threadId: parseInt(id), content: reply });
        window.location.reload();
    };

    if (!thread) return <p>Loading...</p>;

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">{thread.title}</h2>

            <div className="space-y-3 mb-6">
                {thread.posts.map(p => (
                    <div key={p.id} className="p-3 border rounded-lg bg-gray-50 shadow-sm">
                        <p>{p.content}</p>
                        <span className="text-xs text-gray-500">
                            Posted {formatDistanceToNow(new Date(p.createdAt), { addsuffix: true })}
                        </span>
                    </div>
                ))}
            </div>

            <div className="p-4 border rounded-lg bg-white shadow">
                <h3 className="font-semibold mb-2">Write a reply</h3>
                <textarea
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    rows="4"
                    placeholder="Write your reply..."
                />
                <button
                    onClick={handleReply}
                    className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Reply
                </button>
            </div>
        </div>
    );
}

export default ThreadPage;