import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';

const topics = [
    'chữ cái',
    'chữ số',
    // Thêm các chủ đề khác tại đây
];

const StudyHome = () => {
    const navigate = useNavigate();

    return (
        <div className="">
            <NavBar />
            <div style={{ padding: '2rem' }}>
                <h2>Chọn chủ đề để học</h2>
                {topics.map((topic) => (
                    <Link
                        key={topic}
                        to={`/study/${topic}`}
                        onClick={e => {
                            e.preventDefault();
                            navigate(`/study/${topic}`);
                        }}
                    >
                        <button style={{ width: '100%', padding: '1rem', fontSize: '1rem' }}>
                            {topic.charAt(0).toUpperCase() + topic.slice(1)}
                        </button>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default StudyHome;