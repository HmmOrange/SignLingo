import NavBar from '../NavBar/NavBar';
import React, { useState } from 'react';
import { useRef, useEffect } from 'react';


function Dictionary() {
    const [selectedWord, setSelectedWord] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("Từ ngữ");
    const trendingWords = ['Xin chào', 'Tạm biệt', 'Việt Nam', 'Giúp tôi', 'Cảm ơn'];

    // State for search input and suggestions
    const [searchTerm, setSearchTerm] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    // For demonstration, combine trendingWords as suggestions; replace with your full dictionary as needed
    const suggestions = trendingWords;
    const filteredSuggestions = suggestions.filter(word =>
        word.toLowerCase().includes(searchTerm.toLowerCase()) && word !== searchTerm
    );
    
    // Khi selectedWord thay đổi thì video sẽ tự động thay đổi do src của <video> phụ thuộc vào selectedWord.
    // Tuy nhiên, để đảm bảo video luôn phát lại từ đầu khi selectedWord thay đổi, bạn có thể dùng useRef và useEffect như sau:


    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load(); // Reset video khi selectedWord thay đổi
        }
    }, [selectedWord]);

    const [description, setDescription] = useState('');

    useEffect(() => {
        if (selectedWord) {
            fetch(`src/Dictionary/Describe/${selectedWord}.txt`)
                .then((res) => res.ok ? res.text() : Promise.reject('Không tìm thấy mô tả'))
                .then((text) => {
                    if (text.startsWith('<!doctype html') || text.includes('<html')) {
                        setDescription('Không tìm thấy mô tả cho từ này.');
                    } else {
                        setDescription(text);
                    }
                })
                .catch((err) => {
                    console.error(err);
                    setDescription('Không tìm thấy mô tả cho từ này.');
                });
        } else {
            setDescription('');
        }
    }, [selectedWord]);

    return (
        <>
        <NavBar />
        <div className="flex m-0 p-0 -ml-10">      
            <div className="flex bg-white text-black w-full">
                {/* Sidebar - Các từ trending */}
                <aside className="w-1/5 border rounded-lg mr-20 flex-col overflow-hidden">
                    <h2 className="text-xl font-bold h-1/6 flex items-center justify-center">Các từ trending</h2>
                    <ul className="h-5/6 overflow-y-hidden overflow-x-hidden">
                        {trendingWords.map((word, index) => {
                            const isSelected = selectedWord === word;
                            return (
                                <React.Fragment key={index}>
                                    {index === 0 && <hr className="mx-4 border-t" />}
                                    <li
                                        className={`flex h-1/5 items-center space-x-4 px-4 hover:bg-[#49BBBD]/60 py-3 w-full cursor-pointer transition ${
                                            isSelected ? '' : 'hover:bg-[#49BBBD]/60'
                                        }`}
                                        onClick={() => setSelectedWord(word)}
                                    >
                                        <img
                                            src={`src/Dictionary/img/${index+1}.jpg`}
                                            alt={word}
                                            className="w-20 h-12 object-cover"
                                        />
                                        <span className="text-base font-medium break-words max-w-[100px]">{word}</span>
                                    </li>
                                    {index < trendingWords.length - 1 && <hr className="mx-4 border-t" />}
                                </React.Fragment>
                            );
                        })} 
                    </ul>
                </aside>

                <main className="w-4/5 border border-gray-300">

                    <div className="flex justify-end space-x-2 mb-3 p-2 rounded-lg">
                        <div className="flex items-center space-x-2 bg-[#A1D8D1] p-2 rounded-3xl">
                        {['Từ ngữ', 'Chữ cái', 'Chữ số'].map((item, i) => (
                            <button
                                key={i}
                                className={`px-12 py-2 text-lg font-medium border-2 border-transparent rounded-3xl hover:bg-[#49BBBD] hover:cursor-pointer ${
                                    selectedCategory === item ? '!bg-[#49BBBD] text-white' : 'bg-[#A1D8D1]'
                                }`}
                                onClick={() => {
                                    setSelectedCategory(item);
                                    console.log(item);
                                }}
                            >
                                <span className="break-words">{item}</span>
                            </button>
                        ))}
                        </div>
                    </div>
                    <div className="relative mb-4">
                        <input
                            type="text"
                            placeholder="Điền từ cần tìm kếm..."
                            className="w-full h-14 px-5 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                            value={searchTerm}
                            onChange={e => {
                                setSearchTerm(e.target.value);
                                setShowSuggestions(true);
                            }}
                            onFocus={() => setShowSuggestions(true)}
                            onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
                        />
                        {showSuggestions && searchTerm && filteredSuggestions.length > 0 && (
                            <ul className="absolute z-10 left-0 right-0 max-w-3xs bg-red-500 border rounded shadow max-h-60 overflow-y-auto">
                                {filteredSuggestions.map((word, idx) => (
                                    <li
                                        key={idx}
                                        className="px-4 py-2 hover:bg-[#49BBBD]/30 cursor-pointer"
                                        onMouseDown={() => {
                                            setSelectedWord(word);
                                            setSearchTerm(word);
                                            setShowSuggestions(false);
                                        }}
                                    >
                                        {word}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="grid grid-cols-[2.5fr_1fr] gap-6">
                        <div className="border rounded p-4">
                            <h3 className="font-semibold mb-2">Video</h3>
                            <div className="bg-gray-100 h-92 flex items-center justify-center text-gray-400">
                                {selectedWord ? (
                                    <video ref={videoRef} className="w-full h-full" controls>
                                        <source src={`src/Dictionary/vid/${selectedWord}.mp4`} type="video/mp4"/>
                                        Your browser does not support HTML video.
                                    </video>
                                ) : 'Chọn một từ để xem video'}
                            </div>
                        </div>
                        <div className="border rounded p-4">
                            <h3 className="font-semibold mb-2">Giải thích</h3>
                            <p className="text-gray-600 w-[250px] break-words text-left">
                                {selectedWord
                                    ? description || `Giải thích cho từ "${selectedWord}" sẽ hiển thị ở đây.`
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
