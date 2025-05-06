import NavBar from '../NavBar/NavBar';
import React from 'react';
function Translator() {
    return (
        <div>
            <NavBar />
            <div className="flex flex-col items-center p-4 gap-6">
                <div className="flex gap-4">
                    <button className="text-lg px-6 py-4 shadow-md rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition">Dịch thủ ngữ</button>
                    <button className="text-lg px-6 py-4 rounded-lg border border-gray-300 hover:bg-gray-100 transition">Dịch tiếng Việt</button>
                </div>

                <div className="w-full max-w-5xl p-6 border rounded-2xl shadow-sm mt-6">
                    <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium">Đầu vào</label>
                    <select className="w-48 p-2 border rounded-md">
                        <option>- Chọn -</option>
                        <option value="1">Tuỳ chọn 1</option>
                        <option value="2">Tuỳ chọn 2</option>
                    </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div className="h-64 flex items-center justify-center text-xl font-semibold border rounded-lg">Chọn đầu vào</div>

                    <div className="relative h-64 p-4 flex flex-col justify-between border rounded-lg">
                        <div className="text-xl font-semibold text-gray-400">Bản dịch</div>
                        <div className="flex justify-end gap-3 mt-auto">
                        <button className="p-2 hover:text-blue-500" title="Nghe">
                            🔊
                        </button>
                        <button className="p-2 hover:text-blue-500" title="Chia sẻ">
                            🔗
                        </button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Translator;