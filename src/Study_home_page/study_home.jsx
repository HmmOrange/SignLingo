import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';


const StudyHome = () => {
    const navigate = useNavigate();

    // Card component
    const StudyCard = ({ imageSrc, topicName, progress }) => {
        // Determine button label based on progress
        let buttonLabel = "Tiếp tục học";
        if (progress === 0) buttonLabel = "Bắt đầu học";
        else if (progress === 100) buttonLabel = "Xem lại";

        return (
            <div className="bg-white rounded-xl shadow-2xl p-4 w-[55vh] h-[50vh]">
            <img
                src={imageSrc}
                alt={topicName}
                className="rounded-lg p-2 w-full h-5/8 object-cover "
            />
            <div className="font-semibold text-lg h-1/8 flex items-center justify-center">Chủ đề: {topicName}</div>
            <div className="flex items-center h-1/8 ">
                <span className="text-sm text-gray-500">
                {progress}%
                </span>
                <div className="flex-1 ml-2 bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                    className="bg-[#49BBBD] h-2"
                    style={{ width: `${progress}%` }}
                ></div>
                </div>
            </div>
            <div className="flex justify-end h-1/8">
                <button
                className="w-2/5 bg-[#49BBBD] text-white h-full rounded-lg font-semibold hover:bg-teal-500 transition hover:cursor-pointer"
                onClick={() => navigate(`/study/quốc gia`)}
                >
                {buttonLabel}
                </button>
            </div>
            </div>
        );
    };

    return (
        <div className="absolute top-[8vh] left-0 w-full h-[220vh] overflow-x-hidden overflow-y-hidden">
            <NavBar />

            <div className="flex-col h-[200vh] w-full ">
                <div className="flex-col h-1/3 w-full mb-[5vh]">
                    <div
                        className="absolute inset-0 h-1/3 w-full pointer-events-none"
                        style={{ backgroundColor: '#9DCCFF', opacity: 0.2, zIndex: 0 }}
                    ></div>
                    <div className="relative z-10 flex h-1/6 w-full justify-start items-center">
                        <span className="text-3xl font-bold text-center ml-[5vw]">
                            Đang tham gia
                        </span>
                    </div>
                    <div className="relative z-10 flex h-5/6 w-full justify-center items-center">
                        <div className="w-10/11 h-full flex gap-[10vw] justify-center items-center ">
                            <StudyCard
                                imageSrc="src/Study_home_page/img/1.png"
                                topicName="Quốc gia"
                                progress={35}
                            />
                            <StudyCard
                                imageSrc="src/Study_home_page/img/2.png"
                                topicName="Món ăn"
                                progress={20}
                            />
                        </div>
                        <div className="w-1/11 flex items-center justify-center">
                            <button
                                className="hover:cursor-pointer flex items-center justify-center w-[7vw] h-[5vw] rounded-full bg-teal-300 hover:bg-teal-400 transition shadow-lg p-0 overflow-hidden"
                                aria-label="Xem thêm"
                                style={{ aspectRatio: '7/4', minWidth: 0, minHeight: 0 }}
                            >
                                <span
                                    className="flex items-center justify-center text-white"
                                    style={{
                                        fontSize: '2.5vw',
                                        width: '5vw',
                                        height: '5vw',
                                        lineHeight: 1,
                                    }}
                                >
                                    &#8594;
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
                
                <div className="flex-col h-1/3 w-full mt-[10vh] mb-[5vh] bg-white">
                    <div className="flex h-1/6  w-full justify-start items-center ">
                        <span className="text-3xl font-bold text-center ml-[5vw]">
                            Chưa tham gia
                        </span>
                    </div>
                    <div className="flex h-5/6 w-full justify-center items-center">
                        <div className="w-10/11 h-full flex gap-[10vw] justify-center items-center ">
                            <StudyCard
                                imageSrc="src/Study_home_page/img/3.png"
                                topicName="Màu sắc"
                                progress={0}
                            />
                            <StudyCard
                                imageSrc="src/Study_home_page/img/4.png"
                                topicName="Thời tiết"
                                progress={0}
                            />
                        </div>
                        <div className="w-1/11 flex items-center justify-center">
                            <button
                                className="hover:cursor-pointer flex items-center justify-center w-[7vw] h-[5vw] rounded-full bg-teal-300 hover:bg-teal-400 transition shadow-lg p-0 overflow-hidden"
                                aria-label="Xem thêm"
                                style={{ aspectRatio: '7/4', minWidth: 0, minHeight: 0 }}
                            >
                                <span
                                    className="flex items-center justify-center text-white"
                                    style={{
                                        fontSize: '2.5vw',
                                        width: '5vw',
                                        height: '5vw',
                                        lineHeight: 1,
                                    }}
                                >
                                    &#8594;
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex-col h-1/3 w-full mb-[5vh] bg-green-100">
                    <div className="flex h-1/6  w-full justify-start items-center ">
                        <span className="text-3xl font-bold text-center ml-[5vw]">
                            Đã hoàn thành
                        </span>
                    </div>
                    <div className="flex h-5/6 w-full justify-center items-center">
                        <div className="w-10/11 h-full flex ml-[11vw] justify-start items-center ">
                            <StudyCard
                                imageSrc="src/Study_home_page/img/5.png"
                                topicName="Nghề nghiệp"
                                progress={100}
                            />
                        </div>
                    </div>
                </div>                        

            </div>
        </div>
    );
};

export default StudyHome;