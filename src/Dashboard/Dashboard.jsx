import React from 'react';
import './Dashboard.css';
import lessonImg1 from '../assets/environment.png';
import lessonImg2 from '../assets/dictionary.png'; 

import { useNavigate } from 'react-router-dom';

function Dashboard({ username }) {
  const lessons = [
    { topic: 'Môi trường', image: lessonImg1 },
    { topic: 'Món ăn', image: lessonImg2 },
  ];

  const navigate = useNavigate();
  const handleDict = () => {
		navigate("/dictionary");
  };


  return (
    <div className="dashboard-container">

      <div className='lesson-h2'>
        <h2>Chào mừng {username}, hãy tiếp tục bài học của bạn!</h2>
      </div>
      
      <div className="lesson-section">
        
        {lessons.map(({ topic, image }) => (
          <div className="card" key={topic}>
            <img src={image} alt={topic} />
            <div className="card-content">
              <h3>Chủ đề: {topic}</h3>
              <div className="progress-row">
                <span className="lesson-info">Lesson 5 of 7</span>
              </div>
              <div className="progress-bar"><div style={{ width: '70%' }} /></div>
              <div className="button-row">
                <div></div>
                <button className="action-button">Tiếp tục học</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='features-h2'>
        <h2>Các chức năng khác của SignLingo</h2>
      </div>
      <div className="features-section">
        <div className="card">
          <img src={lessonImg1} alt="Từ điển" />
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
          <img src={lessonImg2} alt="Thông dịch" />
          <div className="card-content">
            <h3>Thông dịch</h3>
            <p>Dịch các thao tác tay qua video webcam thành câu từ Tiếng Việt</p>
            <div className='button-row'>
              <div></div>
              <button className="action-button">Dịch Video</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
