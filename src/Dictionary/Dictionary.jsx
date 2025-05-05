import NavBar from '../NavBar/NavBar';
import React, { useState } from 'react';


function Dictionary() {
    const [selectedWord, setSelectedWord] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const trendingWords = ['Xin chào', 'Tạm biệt', 'Việt Nam', 'Giúp tôi', 'Cảm ơn'];

    return (
        <>
        <NavBar />
        <div className="flex m-0 p-0 -ml-10">      
            <div className="flex bg-white text-black w-full">
                {/* Sidebar - Các từ trending */}
                <aside className="w-1/5 border rounded-lg p-4 py-10">
                    <h2 className="text-xl font-bold mb-6">Các từ trending</h2>
                    <ul className="space-y-4">
                        {trendingWords.map((word, index) => {
                            const isSelected = selectedWord === word;
                            return (
                                <li
                                    key={index}
                                    className={`flex items-center space-x-4 border rounded-lg px-4 py-3 w-full cursor-pointer transition ${
                                        isSelected ? '' : 'hover:bg-teal-100'
                                    }`}
                                    onClick={() => setSelectedWord(word)}
                                >
                                    <img
                                        src={`src/Dictionary/img/${index+1}.jpg`}
                                        alt={word}
                                        className="w-20 h-12 object-cover"
                                    />
                                    <span className="text-base font-medium">{word}</span>
                                </li>
                            );
                        })}
                    </ul>
                </aside>

                <main className="w-4/5 pl-6 border border-gray-300">

                    <div className="flex justify-end space-x-2 mb-6">
                        {['Từ ngữ', 'Chữ cái', 'Chữ số'].map((item, i) => (
                            <button
                                key={i}
                                className={`px-6 py-2 text-lg font-medium border-2 border-transparent hover:bg-teal-300 hover:cursor-pointer ${
                                    selectedCategory === item ? '!bg-teal-200 text-blue-400 !border-2 !border-black' : 'bg-gray-200'
                                }`}
                                onClick={() => {
                                    setSelectedCategory(item);
                                    console.log(item);
                                }}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                    <input
                        type="text"
                        placeholder="Điền từ cần tìm kếm..."
                        className="w-full px-4 py-2 mb-6 border rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                    />

                    {/* Video and Explanation */}
                    <div className="grid grid-cols-[2.5fr_1fr] gap-6">
                        <div className="border rounded p-4">
                            <h3 className="font-semibold mb-2">Video</h3>
                            <div className="bg-gray-100 h-92 flex items-center justify-center text-gray-400">
                                {selectedWord ? `Video của "${selectedWord}"` : 'Chọn một từ để xem video'}
                            </div>
                        </div>
                        <div className="border rounded p-4">
                            <h3 className="font-semibold mb-2">Giải thích</h3>
                            <p className="text-gray-600">
                                {selectedWord
                                    ? `Giải thích cho từ "${selectedWord}" sẽ hiển thị ở đây.`
                                    : 'Chọn một từ để xem giải thích.'}
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
        </>
    );
}

export default Dictionary;
