import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function NewThreadPage() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        await axios.post('http://localhost:3000/thread', { title, content });
        navigate('');
    };

    return (
        <div>
            <h2>New Thread</h2>
            <input
                placeholder='Thread title'
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <br />
            <textarea
                placeholder="First post"
                value={content}
                onChange={e => setContent(e.target.value)}
            />
            <br />
            <button onClick={handleSubmit}>Create Thread</button>
        </div>
    );
}

export default NewThreadPage;