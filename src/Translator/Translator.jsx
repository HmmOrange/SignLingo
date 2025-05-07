import NavBar from '../NavBar/NavBar';
import React from 'react';
function Translator() {
    const [selected, setSelected] = React.useState(0);

    const [inputType, setInputType] = React.useState('');

    // Ref for video element
    const videoRef = React.useRef(null);

    // Effect to handle webcam stream
    React.useEffect(() => {
        let stream;
        const videoEl = videoRef.current;
        if (inputType === 'webcam' && videoEl) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(s => {
                    stream = s;
                    videoEl.srcObject = stream;
                })
                .catch(() => {});
        } else if (videoEl && videoEl.srcObject) {
            // Stop webcam if not using webcam input
            const tracks = videoEl.srcObject.getTracks();
            tracks.forEach(track => track.stop());
            videoEl.srcObject = null;
        }
        // Cleanup on unmount or inputType change
        return () => {
            if (videoEl && videoEl.srcObject) {
                const tracks = videoEl.srcObject.getTracks();
                tracks.forEach(track => track.stop());
                videoEl.srcObject = null;
            }
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [inputType]);

    const [uploadedVideo, setUploadedVideo] = React.useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setUploadedVideo(url);
        }
    };

    const handleRemoveVideo = () => {
        if (uploadedVideo) {
            URL.revokeObjectURL(uploadedVideo);
        }
        setUploadedVideo(null);
    };

    return (
        <div className="shadow-blue-600 shadow-lg bg-transparent w-[90vw] h-[80vh] ml-[-4vw]">
            <NavBar />
            <div className="flex w-[90vw] h-[80vh] flex-col items-center">
                <div className="flex h-1/5 w-full">
                    <div className="pl-[5vw] flex justify-items-start items-center w-1/2">
                        <button
                            className={`break-words text-lg px-6 py-4 shadow-md rounded-lg hover:bg-blue-500 hover:cursor-pointer transition ${selected === 0 ? 'bg-blue-200' : ''}`}
                            onClick={() => setSelected(0)}
                        >
                            Dịch thủ ngữ
                        </button>
                    </div>
                    <div className="pl-[5vw] flex justify-items-start items-center w-1/2">
                        <button
                            className={`break-words text-lg px-6 py-4 rounded-lg shadow-md hover:cursor-pointer hover:bg-blue-500 transition ${selected === 1 ? 'bg-blue-200' : ''}`}
                            onClick={() => setSelected(1)}
                        >
                            Dịch tiếng Việt
                        </button>
                    </div>
                </div>

                <div className="w-full h-4/5 border shadow-sm px-[2vw] py-[2vh]">

                    <div className="h-full grid grid-cols-1 md:grid-cols-2 gap-10 p-5">
                        <div className="bg-amber-200 text-xl font-semibold border rounded-lg relative" id="left-translator">
                            <div className="h-5/6 flex items-center justify-center bg-blue-400 text-left" id="left-translator-content">
                                {inputType === 'webcam' ? (
                                    <div className="flex flex-col items-center justify-center w-full h-full bg-red-300">
                                        <div
                                            className="relative w-full h-full"
                                            style={{
                                                background: '#000',
                                                borderRadius: '12px',
                                                overflow: 'hidden',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <video
                                                autoPlay
                                                playsInline
                                                ref={videoRef}
                                                className="absolute top-0 left-0 w-full h-full"
                                                style={{
                                                    objectFit: 'fill',
                                                    width: '100%',
                                                    height: '100%',
                                                }}
                                            />
                                        </div>
                                    </div>
                                ) : inputType === 'file' ? (
                                    uploadedVideo ? (
                                        <div className="relative w-full h-full"
                                            style={{
                                                background: '#000',
                                                borderRadius: '12px',
                                                overflow: 'hidden',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                        }}>
                                            <video
                                                src={uploadedVideo}
                                                controls
                                                className="absolute top-0 left-0 w-full h-full"
                                                style={{
                                                    objectFit: 'fill',
                                                    maxWidth: '100%',
                                                    maxHeight: '100%',
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center">
                                            <label className="mb-[2vh] font-medium" htmlFor="video-upload">
                                                Tải video lên
                                            </label>
                                            <input
                                                id="video-upload"
                                                type="file"
                                                accept="video/*"
                                                className="text-sm text-gray-500 hover:cursor-pointer
                                                    file:mr-4 file:py-2 file:px-4
                                                    file:rounded-full file:border-0
                                                    file:text-sm file:font-semibold
                                                    file:bg-blue-50 file:text-blue-700
                                                    hover:file:bg-blue-100"
                                                onChange={handleFileChange}
                                            />
                                        </div>
                                    )
                                ) : (
                                    "Chọn đầu vào"
                                )}
                            </div>
                            {/* 2 nút tròn nhỏ với icon ở góc dưới bên trái */}
                            <div className="h-1/6 flex w-full border-2" name="support-btns">
                                <div className="flex gap-3 border rounded-lg items-center pl-[2vw] w-1/2">
                                    <button
                                        className={`w-10 h-10 flex items-center justify-center rounded-full shadow-md bg-white border hover:cursor-pointer hover:bg-blue-100 transition ${inputType === 'file' ? 'ring-2 ring-blue-400' : ''}`}
                                        title="Tải video lên"
                                        onClick={() => {
                                            setInputType('file');
                                            setUploadedVideo(null);
                                        }}
                                    >
                                        {/* Icon upload */}
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12" />
                                        </svg>
                                    </button>
                                    <button
                                        className={`w-10 h-10 flex items-center justify-center rounded-full shadow-md bg-white border hover:cursor-pointer hover:bg-blue-100 transition ${inputType === 'webcam' ? 'ring-2 ring-blue-400' : ''}`}
                                        title="Webcam"
                                        onClick={() => {
                                            setInputType('webcam');
                                            setUploadedVideo(null);
                                        }}
                                    >
                                        {/* Icon camera */}
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M4 6h16M4 18h16M4 6v12" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="flex w-1/2 justify-end items-center pr-[1vw]">
                                    {inputType === 'file' && uploadedVideo && (
                                        <>
                                            <button
                                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 hover:cursor-pointer"
                                                onClick={handleRemoveVideo}
                                            >
                                                Tải video khác
                                            </button>
                                            
                                            <button
                                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 ml-3 hover:cursor-pointer"
                                            >
                                                dịch
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="relative p-4 flex flex-col justify-between border rounded-lg">
                            <div className="text-xl font-semibold text-gray-400 text-left">
                                Bản dịch
                            </div>
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