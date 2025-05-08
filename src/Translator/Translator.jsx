import NavBar from '../NavBar/NavBar';
import React from 'react';
function Translator() {
    const [selected, setSelected] = React.useState(0);

    const [inputType, setInputType] = React.useState('');

    const [translating, settranslating] = React.useState(false);

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

    // State to track if translation direction is reversed
    const [isReversed, setIsReversed] = React.useState(false);

    return (
        <div className="bg-transparent w-[90vw] h-[80vh] ml-[-4vw]">
            <NavBar />
            <div className="flex w-[90vw] h-[80vh] flex-col items-center">
                <div className="flex h-1/5 w-full">
                    <div className="pl-[5vw] flex justify-items-start items-center w-1/2">
                        <button
                            className={`break-words text-lg px-6 py-4 shadow-md rounded-lg border-gray-400 border-2  hover:bg-blue-600 hover:cursor-pointer transition ${selected === 0 ? 'bg-blue-500' : ''}`}
                            onClick={() => {
                                setSelected(0);
                                setIsReversed(false);
                            }}
                        >
                            Dịch thủ ngữ
                        </button>
                    </div>
                    <div className="pl-[5vw] flex justify-items-start items-center w-1/2">
                        <button
                            className={`break-words text-lg px-6 py-4 rounded-lg shadow-md border-gray-400 border-2 hover:cursor-pointer hover:bg-blue-600 transition ${selected === 1 ? 'bg-blue-500' : ''}`}
                            onClick={() => {
                                setSelected(1);
                                setIsReversed(true);
                            }}
                        >
                            Dịch tiếng Việt
                        </button>
                    </div>
                </div>

                <div className="w-full h-4/5 shadow-2xl shadow-gray-500 rounded-lg border-gray-400 border-4 px-[2vw] py-[2vh]" style={{ boxShadow: '0px 0px 30px #979797' }}>

                    <div className="h-full grid grid-cols-1 md:grid-cols-2 gap-10 p-5 relative">
                        {/* Đổi chỗ hai phần dịch nếu isReversed */}
                        {isReversed ? (
                            <>
                                {/* Right (Bản dịch) */}
                                <div className="relative h-full p-4 flex flex-col justify-between border rounded-lg">
                                    <textarea
                                        className="text-2xl w-full h-3/4 mt-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        placeholder="Nhập văn bản để dịch..."
                                    ></textarea>
                                    <div className="flex h-1/4 justify-end items-center gap-3 mt-2">
                                        <button className="px-4 w-1/4 h-3/5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 hover:cursor-pointer text-2xl"
                                            onClick={() => {
                                                settranslating(true);
                                                setUploadedVideo('src/Dictionary/vid/Xin chào.mp4')
                                            }}
                                        >
                                            Dịch
                                        </button>
                                    </div>
                                </div>
                                {/* Left (Input) */}
                                <div className="text-xl font-semibold border rounded-lg relative" id="left-translator">
                                    <div className="h-5/6 flex items-center justify-center  text-left" id="left-translator-content">
                                        {/* Hiển thị video kết quả sau khi ấn nút "dịch" */}
                                        {translating ? (
                                            <div className="relative w-full h-full"
                                                style={{
                                                    background: '#000',
                                                    overflow: 'hidden',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}>
                                                <video
                                                    src={uploadedVideo}
                                                    autoPlay
                                                    muted
                                                    playsInline
                                                    onEnded={() => {
                                                        settranslating(false);
                                                        setUploadedVideo(null);
                                                        }
                                                    }
                                                    className="absolute top-0 left-0 w-full h-full"
                                                    style={{
                                                        objectFit: 'fill',
                                                        maxWidth: '100%',
                                                        maxHeight: '100%',
                                                    }}
                                                />
                                            </div>
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center text-white">
                                                Ấn dịch để hiển thị kết quả
                                            </div>
                                        )}
                                    </div>
                                    {/* 2 nút tròn nhỏ với icon ở góc dưới bên trái */}
                                    <div className="h-1/6 flex w-full border-2" name="support-btns">

                                        <div className="flex w-full justify-end items-center pr-[1vw]">
                 
                                                <>
                                                    
                                                    <button
                                                        className="px-4 py-2 bg-blue-300 text-white rounded hover:bg-blue-400 ml-3 hover:cursor-pointer" id="translate-btn"
                                                        
                                                    >
                                                        Just here for now
                                                    </button>
                                                </>

                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                            {/* Nếu không reversed thì hiển thị như bình thường */}
                                {/* Left (Input) */}
                                <div className=" text-xl font-semibold border rounded-lg relative" id="left-translator">
                                    <div className="h-4/5 flex items-center justify-center text-left" id="left-translator-content">
                                        {inputType === 'webcam' ? (
                                            <div className="flex flex-col items-center justify-center w-full h-full">
                                                <div
                                                    className="relative w-full h-full"
                                                    style={{
                                                        background: '#000',
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
                                            
                                            <div className="text-2xl">Chọn đầu vào</div>
                                        )}
                                    </div>
                                    {/* 2 nút tròn nhỏ với icon ở góc dưới bên trái */}
                                    <div className="h-1/5 flex w-full border rounded-lg" name="support-btns">
                                        <div className="flex gap-3 items-center pl-[2vw] w-1/2">
                                            <button
                                                className={`w-15 h-15 flex items-center justify-center rounded-full shadow-md bg-white border hover:cursor-pointer hover:bg-blue-100 transition ${inputType === 'file' ? 'ring-2 ring-blue-400' : ''}`}
                                                title="Tải video lên"
                                                onClick={() => {
                                                    setInputType('file');
                                                    setUploadedVideo(null);
                                                }}
                                            >
                                                {/* Icon upload */}
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12" />
                                                </svg>
                                            </button>
                                            <button
                                                className={`w-15 h-15 flex items-center justify-center rounded-full shadow-md bg-white border hover:cursor-pointer hover:bg-blue-100 transition ${inputType === 'webcam' ? 'ring-2 ring-blue-400' : ''}`}
                                                title="Webcam"
                                                onClick={() => {
                                                    setInputType('webcam');
                                                    setUploadedVideo(null);
                                                }}
                                            >
                                                {/* Icon camera */}
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                                                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ml-3 hover:cursor-pointer"
                                                    >
                                                        dịch
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {/* Right (Bản dịch) */}
                                <div className="relative p-4 flex flex-col justify-between border rounded-lg">
                                    <div className="text-2xl py-[1vh] px-[1vw] font-semibold text-gray-400 text-left">
                                        Bản dịch ...
                                    </div>
                                    {/* <div className="flex justify-end gap-3 mt-auto">
                                        <button className="p-2 hover:text-blue-500" title="Nghe">
                                            🔊
                                        </button>
                                        <button className="p-2 hover:text-blue-500" title="Chia sẻ">
                                            🔗
                                        </button>
                                    </div> */}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Translator;