import React from 'react';
import './Dashboard.css';
import lessonImg1 from '../assets/environment.png';
import lessonImg2 from '../assets/food.png'; 

import featuresImg1 from '../assets/dictionary.png';
import featuresImg2 from '../assets/translator.png';
import featuresImg3 from '../assets/quốc gia.png'

import { useNavigate } from 'react-router-dom';

function Dashboard({ username }) {
  const lessons = [
    { topic: 'Môi trường', image: lessonImg1, progress: 25 },
    { topic: 'Món ăn', image: lessonImg2, progress: 10 },
    { topic: 'Quốc gia', image: featuresImg3, progress: 35 },
  ];

  const navigate = useNavigate();
  const handleDict = () => {
		navigate("/dictionary");
  };

  const handleTrans = () => {
		navigate("/translator");
  };


  return (
    <div className="dashboard-container fixed w-full h-full top-0 left-0 bg-gradient-to-b from-blue-100 via-amber-100 to-blue-200">

      <div className='lesson-h2'>
        <h2>Chào mừng {username}, hãy tiếp tục bài học của bạn!</h2>
      </div>
      
      <div className="lesson-section shadow-2xl">
        {lessons.map(({ topic, image, progress }) => (
          <div
            className="card"
            key={topic}
            onClick={() => {
              if (topic === "Quốc gia") {
                navigate("/study/quốc gia");
              }
            }}
            style={topic === "Quốc gia" ? { } : {}}
          >
            <img src={image} alt={topic} />
            <div className="card-content">
              <h3>Chủ đề: {topic}</h3>
              <div className="progress-row">
                <span className="lesson-info">Lesson 1 of 3</span>
              </div>
              <div className="progress-bar"><div style={{ width: `${progress}%` }} /></div>
              <div className="button-row">
                <div></div>
                <button
                  className="action-button cursor-pointer"
                  onClick={e => {
                    e.stopPropagation();
                    if (topic === "Quốc gia") {
                      navigate("/study/quốc gia");
                    }
                  }}
                >
                  Tiếp tục học
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='features-h2 bg-amber-100'>
        <h2>Các chức năng khác của SignLingo</h2>
      </div>
      <div className="features-section bg-amber-100 shadow-2xl">
        <div className="card">
          <img src={featuresImg1} alt="Từ điển" />
          <div className="card-content">
            <h3>Từ điển</h3>
            <p>Tra cách để biểu diễn ngôn ngữ kí hiệu qua từ điển video</p>
            <div className='button-row'>
              <div></div>
              <button className="action-button" onClick={handleDict}>Tra cứu</button>
            </div>
          </div>
        </div>
        <div className="card">
          <img src={featuresImg2} alt="Thông dịch" />
          <div className="card-content">
            <h3>Thông dịch</h3>
            <p>Dịch các thao tác tay qua video webcam thành câu từ Tiếng Việt</p>
            <div className='button-row'>
              <div></div>
              <button className="action-button" onClick={handleTrans}>Dịch Video</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
