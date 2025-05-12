// src/pages/Landing.tsx
import React from 'react';
import '../styles/Landing.css';
import { Link } from 'react-router-dom';

const Landing: React.FC = () => {
  return (
    <div className="landing-container">
      {/* 상단 바 */}
      <nav className="landing-nav">
        <div className="logo">Harugachi</div>
        <ul className="nav-menu">
          <li><Link to="/activity">활동</Link></li>
          <li><Link to="/community">커뮤니티</Link></li>
          <li><Link to="/mypage">내 정보</Link></li>
          <li><Link to="/login">로그인</Link></li>
        </ul>
      </nav>

      {/* 메인 영역 */}
      <main className="landing-main">
        <h1 className="landing-title">오늘 누구랑 함께할까?</h1>
        <p className="landing-subtitle">하루를 공유할 친구를 지금 찾아보세요!</p>
        <Link to="/activity" className="landing-cta">활동 보러가기</Link> {/* '활동 보러가기' 버튼을 활동과 같은 페이지로 연결 */}
      </main>
    </div>
  );
};

export default Landing;
