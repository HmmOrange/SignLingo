import NavBar from '../NavBar/NavBar';
import React from 'react';

const lessons = [
    { 
        title: "Bài 1 : Châu Á", 
        words: [
            "Việt Nam",
            "Ả rập",
            "Băng-la-đét",
            "Brunei",
            "Cam-pu-chia",
            "Đông Timor",
            "Lào",
            "Mã Lai",
            "Miến Điện",
            "Trung Quốc",
        ],
        progress: { cur: 7, limit: 10 }, 
        active: true 
    },
    { 
        title: "Bài 2 : Châu Âu", 
        words: [
            "Albania",
            "Anh",
            "Bun-ga-ri",
            "Cộng Hòa Séc",
            "Hà Lan",
            "Hung-ga-ri",
            "Italia",
            "Liên Bang Nga",
        ],
        progress: { cur: 3, limit: 8 }, 
        active: false 
    },
    { 
        title: "Bài 3 : Châu Mỹ", 
        words: [
            "Braxin",
            "Chi-lê",
            "Colombia",
            "Cu ba",
            "Mexico",
            "Mỹ",
            "Pê-ru",
        ],
        progress: { cur: 1, limit: 7 }, 
        active: false 
    },
];

const topic = "Quốc gia";

function Study() {
const [openIndex, setOpenIndex] = React.useState(null);

const handleLessonClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
    lessons.forEach((lesson, i) => {
        lesson.active = i === index;
    });
};

const [selectedWord, setSelectedWord] = React.useState(lessons[0].words[0]);
const [selectedLessonIndex, setSelectedLessonIndex] = React.useState(0);

React.useEffect(() => {
    if (openIndex !== null) {
        setSelectedLessonIndex(openIndex);
        setSelectedWord(lessons[openIndex].words[0]);
    }
}, [openIndex]);

const handlePrev = () => {
    const curIndex = lessons[selectedLessonIndex].words.indexOf(selectedWord);
    if (curIndex > 0) {
        setSelectedWord(lessons[selectedLessonIndex].words[curIndex - 1]);
    }
};

const handleNext = () => {
    const curIndex = lessons[selectedLessonIndex].words.indexOf(selectedWord);
    if (curIndex < lessons[selectedLessonIndex].words.length - 1) {
        setSelectedWord(lessons[selectedLessonIndex].words[curIndex + 1]);
    }
};

return (
    <div>
        <NavBar />
        <div className="h-[90vh] w-[100vw] flex fixed top-[8vh] left-0 bg-gradient-to-b from-blue-100 via-amber-100 to-blue-200">
            <div
                className="w-1/3 h-[90vh] shadow-md p-4 mr-[2vw] border-2 overflow-y-auto"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                <style>
                    {`
                        .hide-scrollbar::-webkit-scrollbar {
                            display: none;
                        }
                    `}
                </style>
                <div className="hide-scrollbar">
                    <h2 className="text-4xl font-semibold text-blue-800 mb-[4vh]">Chủ đề: {topic}</h2>
                    <ul className="space-y-3">
                        {lessons.map((lesson, index) => (
                            <React.Fragment key={index}>
                                <li
                                    className={`p-3 rounded-lg cursor-pointer relative ${
                                        lesson.active
                                            ? "bg-blue-400 text-black"
                                            : "bg-gray-100 hover:bg-gray-200"
                                    }`}
                                    onClick={() => handleLessonClick(index)}
                                >
                                    <div className="flex justify-between items-center">
                                        <span>{lesson.title}</span>
                                        <span className="text-sm">
                                            {lesson.progress.cur}/{lesson.progress.limit}
                                        </span>
                                    </div>
                                </li>
                                {openIndex === index && (
                                    <div className="w-full flex justify-end">
                                        <div className="w-[90%]">
                                            <ul>
                                                {lesson.words.map((word, i) => (
                                                    <li
                                                        key={i}
                                                        className={`hover:bg-blue-200 mb-1 rounded-xl p-3 last:border-b-0 flex items-center cursor-pointer ${
                                                            selectedWord === word && selectedLessonIndex === index
                                                                ? "bg-teal-100"
                                                                : "bg-white"
                                                        }`}
                                                        onClick={() => {
                                                            setSelectedWord(word);
                                                            setSelectedLessonIndex(index);
                                                        }}
                                                    >
                                                        <span className="mr-2">{i + 1}.</span>
                                                        <span className="mr-2">{word}</span>
                                                        <span className="ml-auto">
                                                            {i < lesson.progress.cur ? "✅" : ""}
                                                        </span>
                                                    </li>
                                                ))}
                                                {/* Bài tập */}
                                                <li
                                                    className={`hover:bg-yellow-200 mb-1 rounded-xl p-3 last:border-b-0 flex items-center cursor-pointer ${
                                                        selectedWord === "__quiz__" && selectedLessonIndex === index
                                                            ? "bg-yellow-100"
                                                            : "bg-white"
                                                    }`}
                                                    onClick={() => {
                                                        setSelectedWord("__quiz__");
                                                        setSelectedLessonIndex(index);
                                                    }}
                                                >
                                                    <span className="mr-2">📝</span>
                                                    <span>Bài tập tự luyện</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="flex h-[90vh] w-2/3 mr-[2vw]">
                <div className=" h-full w-full flex-col">
                    <div className="h-1/8 items-center flex">
                        {selectedWord === "__quiz__" ? (
                            <h2 className="text-3xl font-semibold pl-10">
                                Bài tập kiểm tra: Chọn đúng từ cho video dưới đây
                            </h2>
                        ) : (
                            <h2 className="text-3xl font-semibold pl-10">
                                Từ mới: <span className="text-teal-600">{selectedWord}</span>
                            </h2>
                        )}
                    </div>
                    <div className="h-6/8">
                        {selectedWord === "__quiz__" ? (
                            <Quiz
                                lesson={lessons[selectedLessonIndex]}
                                key={selectedLessonIndex} // reset quiz when lesson changes
                            />
                        ) : (
                            <div className="relative w-full h-full aspect-video overflow-hidden">
                                <video
                                    src={`/data/vid/topic${selectedLessonIndex + 1}/${selectedWord}.mp4`}
                                    controls
                                    className="absolute top-0 left-0 w-full h-full"
                                    style={{ objectFit: 'fill' }}
                                />
                            </div>
                        )}
                    </div>
                    {selectedWord !== "__quiz__" && (
                        <div className="h-1/8">
                            <div className="flex justify-between h-full items-center px-[1vw]">
                                <button
                                    className="hover:cursor-pointer h-3/4 w-1/6 px-4 py-2 text-xl bg-gray-200 rounded-lg hover:bg-gray-300"
                                    onClick={handlePrev}
                                    disabled={lessons[selectedLessonIndex].words.indexOf(selectedWord) === 0}
                                >
                                    Quay lại
                                </button>
                                <button
                                    className="hover:cursor-pointer h-3/4 w-1/6 text-xl px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
                                    onClick={handleNext}
                                    disabled={lessons[selectedLessonIndex].words.indexOf(selectedWord) === lessons[selectedLessonIndex].words.length - 1}
                                >
                                    Tiếp theo
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
);

// Quiz component
function Quiz({ lesson }) {
    const [question, setQuestion] = React.useState(null);
    const [selected, setSelected] = React.useState(null);
    const [showResult, setShowResult] = React.useState(false);

    React.useEffect(() => {
        // pick random word as answer
        const answerIndex = Math.floor(Math.random() * lesson.words.length);
        const answer = lesson.words[answerIndex];

        // pick 3 other random words (not the answer)
        let options = [answer];
        let pool = lesson.words.filter((w) => w !== answer);
        while (options.length < 4 && pool.length > 0) {
            const idx = Math.floor(Math.random() * pool.length);
            options.push(pool[idx]);
            pool.splice(idx, 1);
        }
        // shuffle options
        options = options.sort(() => Math.random() - 0.5);

        setQuestion({
            videoWord: answer,
            options,
            answer,
        });
        setSelected(null);
        setShowResult(false);
    }, [lesson]);

    if (!question) return null;

    return (
        <div className="flex flex-col items-center justify-center h-full relative">
            <div className="relative w-2/3 aspect-video mb-8">
                <video
                    src={`/data/vid/topic${lesson.title.match(/\d+/)[0]}/${question.videoWord}.mp4`}
                    controls
                    className="absolute top-0 left-0 w-full h-full"
                    style={{ objectFit: 'fill' }}
                />
            </div>
            <div className="w-2/3 grid grid-cols-2 gap-6">
                {question.options.map((opt, idx) => (
                    <button
                        key={opt}
                        className={`text-xl px-6 py-4 rounded-lg border-2 ${
                            selected === idx
                                ? opt === question.answer
                                    ? "bg-green-300 border-green-600"
                                    : "bg-red-200 border-red-400"
                                : "bg-white border-gray-300 hover:bg-blue-100"
                        }`}
                        disabled={selected !== null}
                        onClick={() => {
                            setSelected(idx);
                            setShowResult(true);
                        }}
                        style={
                            showResult && opt === question.answer
                                ? { backgroundColor: '#bbf7d0', borderColor: '#16a34a' }
                                : {}
                        }
                    >
                        <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span>
                        {opt}
                    </button>
                ))}
            </div>
            {showResult && (
                <button
                    className="fixed right-[2vw] bottom-[17vh] px-6 py-3 bg-yellow-300 rounded-lg text-lg font-semibold hover:bg-yellow-400 z-50"
                    onClick={() => {
                        // Random lại câu hỏi mới
                        const answerIndex = Math.floor(Math.random() * lesson.words.length);
                        const answer = lesson.words[answerIndex];
                        let options = [answer];
                        let pool = lesson.words.filter((w) => w !== answer);
                        while (options.length < 4 && pool.length > 0) {
                            const idx = Math.floor(Math.random() * pool.length);
                            options.push(pool[idx]);
                            pool.splice(idx, 1);
                        }
                        options = options.sort(() => Math.random() - 0.5);
                        setQuestion({
                            videoWord: answer,
                            options,
                            answer,
                        });
                        setSelected(null);
                        setShowResult(false);
                    }}
                >
                    ➡
                </button>
            )}
        </div>
    );
}
}

export default Study;