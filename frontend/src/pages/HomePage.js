import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function HomePage() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/categories")
        .then(res => setCategories(res.data))
        .catch(err => console.error(err));
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Fuyura Boards</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categories.map(cat => (
                    <Link
                        key={cat.id}
                        to={`/${cat.code}/threads`}
                        className="block p-6 rounded-xl shadow bg-white hover:bg-gray-100"
                    >
                        <h2 className="text-xl font-semibold">{cat.name}</h2>
                        <p className="text-gray-500 text-sm">/{cat.code}/</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default HomePage;