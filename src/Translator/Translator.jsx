import NavBar from '../NavBar/NavBar';
import React from 'react';

function Translator() {
    const [selected, setSelected] = React.useState(0);
    const [inputType, setInputType] = React.useState('');
    const [translating, setTranslating] = React.useState(false); // 'idle' | 'translating' | 'done'
    const [uploadedVideo, setUploadedVideo] = React.useState(null);
    const [isReversed, setIsReversed] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const videoRef = React.useRef(null);
    const canvasRef = React.useRef(null);

    React.useEffect(() => {
        let stream;
        let camera;

        const videoEl = videoRef.current;
        const canvasEl = canvasRef.current;
        const ctx = canvasEl?.getContext('2d');

        const drawLandmarks = (results) => {
            if (!canvasEl || !ctx || !videoEl) return;

            canvasEl.width = videoEl.videoWidth;
            canvasEl.height = videoEl.videoHeight;
            ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
            ctx.drawImage(results.image, 0, 0, canvasEl.width, canvasEl.height);

            // Vẽ các điểm landmark
            const drawPoints = (landmarks, color = 'red', size = 5) => {
                landmarks?.forEach((point) => {
                    ctx.beginPath();
                    ctx.arc(point.x * canvasEl.width, point.y * canvasEl.height, size, 0, 2 * Math.PI);
                    ctx.fillStyle = color;
                    ctx.fill();
                });
            };

            results.multiHandLandmarks?.forEach(lm => drawPoints(lm, 'red', 5));       // Tay
            results.poseLandmarks && drawPoints(results.poseLandmarks, 'green', 5);   // Người
            results.multiFaceLandmarks?.forEach(lm => drawPoints(lm, 'blue', 2));     // Mặt
        };

        if (inputType === 'webcam' && videoEl) {
            navigator.mediaDevices.getUserMedia({ video: true }).then(s => {
                stream = s;
                videoEl.srcObject = stream;

                const setupModels = async () => {
                    const { Hands } = await import('@mediapipe/hands');
                    const { Pose } = await import('@mediapipe/pose');
                    const { FaceMesh } = await import('@mediapipe/face_mesh');
                    const { Camera } = await import('@mediapipe/camera_utils');

                    const hands = new Hands({
                        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
                    });
                    hands.setOptions({
                        maxNumHands: 2,
                        modelComplexity: 1,
                        minDetectionConfidence: 0.7,
                        minTrackingConfidence: 0.5,
                    });

                    const pose = new Pose({
                        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
                    });
                    pose.setOptions({
                        modelComplexity: 1,
                        smoothLandmarks: true,
                        minDetectionConfidence: 0.5,
                        minTrackingConfidence: 0.5,
                    });

                    const faceMesh = new FaceMesh({
                        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
                    });
                    faceMesh.setOptions({
                        maxNumFaces: 1,
                        minDetectionConfidence: 0.5,
                        minTrackingConfidence: 0.5,
                    });

                    const results = { image: videoEl };

                    hands.onResults(r => {
                        results.multiHandLandmarks = r.multiHandLandmarks;
                    });

                    pose.onResults(r => {
                        results.poseLandmarks = r.poseLandmarks;
                    });

                    faceMesh.onResults(r => {
                        results.multiFaceLandmarks = r.multiFaceLandmarks;
                        drawLandmarks(results); // Chỉ vẽ sau khi faceMesh trả kết quả
                    });

                    camera = new Camera(videoEl, {
                        onFrame: async () => {
                            await hands.send({ image: videoEl });
                            await pose.send({ image: videoEl });
                            await faceMesh.send({ image: videoEl });
                        },
                        width: 640,
                        height: 480,
                    });

                    camera.start();
                };

                setupModels();
            }).catch(() => {});
        }

        return () => {
            if (videoEl && videoEl.srcObject) {
                const tracks = videoEl.srcObject.getTracks();
                tracks.forEach(track => track.stop());
                videoEl.srcObject = null;
            }
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
            if (camera) {
                camera.stop();
            }
        };
    }, [inputType]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setUploadedVideo(url);
        }
    };

    const handleRemoveVideo = () => {
        if (uploadedVideo) URL.revokeObjectURL(uploadedVideo);
        setUploadedVideo(null);
    };

    // State để lưu trạng thái overlay
    const [showTranslation, setShowTranslation] = React.useState(false);

    return (
        <div className="fixed w-full h-full top-0 left-0 bg-gradient-to-b from-blue-100 via-amber-100 to-blue-200">
            <div className="bg-transparent w-[90vw] h-[80vh] ml-[-4vw] top-[12vh] fixed left-[9vw]">
                <NavBar />
                <div className="flex w-[90vw] h-[80vh] flex-col items-center">
                    {/* Thanh chọn chế độ */}
                    <div className="flex h-1/5 w-full">
                        <div className="pl-[5vw] flex items-center w-1/2">
                            <button
                                className={`text-lg px-6 py-4 shadow-md rounded-lg border-2 border-gray-400 hover:bg-blue-600 transition ${selected === 0 ? 'bg-blue-500' : ''}`}
                                onClick={() => { setSelected(0); setIsReversed(false); 
                                                            setTranslating(false);
                                                            setUploadedVideo(null);
                                }}
                            >
                                Dịch thủ ngữ
                            </button>
                        </div>
                        <div className="pl-[5vw] flex items-center w-1/2">
                            <button
                                className={`text-lg px-6 py-4 shadow-md rounded-lg border-2 border-gray-400 hover:bg-blue-600 transition ${selected === 1 ? 'bg-blue-500' : ''}`}
                                onClick={() => { setSelected(1); setIsReversed(true); setTranslating(false);
                                                            setUploadedVideo(null);
                                                        }}
                            >
                                Dịch tiếng Việt
                            </button>
                        </div>
                    </div>

                    {/* Vùng chính */}
                    <div className="w-full h-4/5 rounded-lg border-4 border-gray-400 px-[2vw] py-[2vh]" style={{ boxShadow: '0px 0px 30px #979797' }}>
                        <div className="h-full grid grid-cols-1 md:grid-cols-2 gap-10 p-5 relative">
                            {isReversed ? (
                                <>
                                    <div className="relative h-full p-4 flex flex-col justify-between border rounded-lg bg-amber-50">
                                        <textarea
                                            className="text-2xl w-full h-3/4 mt-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            placeholder="Nhập văn bản để dịch..."
                                        ></textarea>
                                        <div className="flex h-1/4 justify-end items-center gap-3 mt-2 ">
                                            <button
                                                className="px-4 w-1/4 h-3/5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-2xl"
                                                onClick={() => {
                                                    setTranslating(false);
                                                    setUploadedVideo(null);
                                                    setIsLoading(true);
                                                    setTimeout(() => {
                                                        setIsLoading(false);
                                                        setTranslating(true);
                                                        setUploadedVideo('data/vid/hello.mp4');
                                                    }, 3000);
                                                    // TODO: change video url to skeleton
                                                }}
                                            >
                                                Dịch
                                            </button>
                                        </div>
                                    </div>
                                    <div className="text-xl font-semibold border rounded-lg relative bg-amber-50">
                                        <div className="h-5/6 flex items-center justify-center">
                                            {translating ? (
                                                <div className="relative w-full h-full bg-black flex justify-center items-center">
                                                    <video
                                                        src={uploadedVideo}
                                                        autoPlay
                                                        muted
                                                        playsInline
                                                        // onEnded={() => {
                                                        //     setTranslating(false);
                                                        //     setUploadedVideo(null);
                                                        // }}
                                                        loop
                                                        className="absolute top-0 left-0 w-full h-full"
                                                        style={{ objectFit: 'fill' }}
                                                    />
                                                </div>
                                            ) : (
                                                isLoading ? (
                                                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 text-2xl">
                                                        <svg className="animate-spin h-10 w-10 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                                                        </svg>
                                                        Đang dịch...
                                                    </div>
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400" name="placeholder">
                                                        Ấn dịch để hiển thị kết quả
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="text-xl font-semibold border rounded-lg relative bg-amber-50">
                                        <div className="h-4/5 flex items-center justify-center">
                                            {inputType === 'webcam' ? (
                                                <div className="relative w-full h-full">
                                                    <video
                                                        autoPlay
                                                        playsInline
                                                        ref={videoRef}
                                                        className="absolute top-0 left-0 w-full h-full"
                                                        style={{ objectFit: 'fill' }}
                                                    />
                                                    <canvas
                                                        ref={canvasRef}
                                                        className="absolute top-0 left-0 w-full h-full pointer-events-none"
                                                    />
                                                </div>
                                            ) : inputType === 'file' ? (
                                                uploadedVideo ? (
                                                    <div className="relative w-full h-full bg-black flex justify-center items-center">
                                                        <video
                                                            src={uploadedVideo}
                                                            controls
                                                            className="absolute top-0 left-0 w-full h-full"
                                                            style={{ objectFit: 'fill' }}
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
                                                                hover:file:bg-blue-300"
                                                            onChange={handleFileChange}
                                                        />
                                                    </div>
                                                )
                                            ) : (
                                                <div className="text-2xl">Chọn đầu vào</div>
                                            )}
                                        </div>
                                        <div className="h-1/5 flex justify-between items-center">
                                            <div className="h-full w-1/2 flex items-center gap-4 px-4">
                                                <button
                                                    onClick={() => {
                                                        setInputType('file');
                                                        setUploadedVideo(null);
                                                        setShowTranslation(false);
                                                    }}
                                                    className={`rounded-full border p-3 hover:cursor-pointer bg-white ${inputType === 'file' ? 'ring-2 ring-blue-400' : ''}`}
                                                >📁</button>
                                                <button
                                                    onClick={() => {
                                                        setInputType('webcam');
                                                        setUploadedVideo(null);
                                                        setShowTranslation(false);
                                                        setTimeout(() => setShowTranslation(true), 7000);
                                                    }}
                                                    className={`rounded-full border hover:cursor-pointer p-3 bg-white ${inputType === 'webcam' ? 'ring-2 ring-blue-400' : ''}`}
                                                >📷</button>
                                            </div>
                                            <div className="h-full flex w-1/2 justify-end items-center pr-[1vw]">
                                                {inputType === 'file' && uploadedVideo && (
                                                    <>
                                                        <button
                                                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 hover:cursor-pointer"
                                                            onClick={() => {
                                                                handleRemoveVideo();
                                                                setShowTranslation(false);
                                                            }}
                                                        >
                                                            Tải video khác
                                                        </button>

                                                        <button
                                                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ml-3 hover:cursor-pointer"
                                                            onClick={() => {
                                                                setShowTranslation("loading");
                                                                setTimeout(() => setShowTranslation(true), 2000);
                                                            }}
                                                        >
                                                            Dịch
                                                        </button>
                                                    </>
                                                )}
                                            </div>                                   
                                        </div>
                                    </div>
                                    <div className="relative p-4 flex flex-col justify-between border rounded-lg min-h-[120px]">
                                        {/* /* Overlay 1: Bản dịch ... */}
                                        {!showTranslation && (
                                            <div className="absolute inset-0 flex items-start justify-start bg-white bg-opacity-80 z-10 rounded-lg transition-opacity duration-300">
                                                <span className="text-3xl font-semibold text-gray-400 m-8">Bản dịch ...</span>
                                            </div>
                                        )}
                                        {/* Overlay 2: Loading & Kết quả dịch */}
                                        {showTranslation === "loading" && (
                                            <div className="absolute inset-0 flex items-start justify-start bg-white bg-opacity-80 z-10 rounded-lg transition-opacity duration-300">
                                                <span className="text-3xl font-semibold text-gray-400 m-8 flex items-center gap-4">
                                                    <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                                                    </svg>
                                                    Đang dịch...
                                                </span>
                                            </div>
                                        )}
                                        {showTranslation === true && (
                                            <div className="absolute inset-0 flex items-start justify-start bg-white bg-opacity-80 z-10 rounded-lg transition-opacity duration-300">
                                                <span className="text-3xl font-semibold m-8">Xin chào</span>
                                            </div>
                                        )}
                                        <div className="opacity-0 select-none">Bản dịch ...</div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Translator;
