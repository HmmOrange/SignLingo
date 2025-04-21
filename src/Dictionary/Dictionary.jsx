import NavBar from '../NavBar/NavBar';
import React, { useState } from 'react';
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";


function Dictionary() {
    const [selectedWord, setSelectedWord] = useState(null);
    const trendingWords = ['Xin chào', 'Tạm biệt', 'Việt Nam', 'Giúp tôi', 'Cảm ơn'];

    return (
        <div className="flex m-0 p-0 -ml-10">
            <NavBar />
            <div className="flex bg-white text-black space-x-10">
                {/* Sidebar - Các từ trending */}
                <aside className="w-[250px] border rounded-lg p-4">
                    <h2 className="text-xl font-bold mb-6">Các từ trending</h2>
                    <ul className="space-y-4">
                        {trendingWords.map((word, index) => {
                            const isSelected = selectedWord === word;
                            return (
                                <li
                                    key={index}
                                    className={`flex items-center space-x-4 border rounded-lg px-4 py-5 w-full cursor-pointer transition ${
                                        isSelected ? '' : 'hover:bg-teal-100'
                                    }`}
                                    onClick={() => setSelectedWord(word)}
                                >
                                    <img
                                        src={`/img${index + 1}.png`}
                                        alt={word}
                                        className="w-10 h-10 object-cover rounded-full"
                                    />
                                    <span className="text-base font-medium">{word}</span>
                                </li>
                            );
                        })}
                    </ul>
                </aside>

                {/* Main content */}
                <main className="flex-2">
                    {/* Category toggle buttons */}
                    <div className="flex space-x-2 mb-6">
                        {['Từ ngữ', 'Chữ cái', 'Chữ số'].map((item, i) => (
                            <button
                                key={i}
                                className={`px-4 py-2 rounded-full text-sm font-medium ${
                                    i === -1 ? 'bg-teal-400 text-white' : 'bg-gray-200'
                                }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    {/* Input */}
                    <input
                        type="text"
                        placeholder="Điền từ cần tìm kiếm..."
                        className="w-250 grid grid-cols-1 px-4 py-2 mb-6 border rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                    />

                    {/* Video and Explanation */}
                    <div className="w-250 grid grid-cols-[2fr_1fr] gap-6">
                        <div className="border rounded p-4">
                            <h3 className="font-semibold mb-2">Video</h3>
                            <div className="bg-gray-100 h-80 flex items-center justify-center text-gray-400">
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
    );
}

export default Dictionary;
