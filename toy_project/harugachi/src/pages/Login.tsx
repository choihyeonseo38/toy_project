import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { Link } from 'react-router-dom';
import { User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;  // 로그인 후 호출할 함수
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // 로그인 처리 예시 (가짜 사용자 객체 생성)
    const fakeUser: User = {
      id: '1234',
      name: '홍길동',
      email: 'hong@example.com',
      nickname: '길동이',   
      gender: '남성',
      age: '20대',
      region: '서울',         
      // profileImage: '',       // 선택적, 필요 시 추가
    };
    
    onLogin(fakeUser);
    navigate('/activity');
  };

  return (
    <div className="login-container">
      <div className="home-btn-container">
        <Link to="/" className="home-btn">홈</Link>
      </div>

      <div className="login-box">
        <h2>로그인</h2>
        <form onSubmit={handleLogin}>
          <label>전화번호 (아이디)</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="010-0000-0000"
            required
          />

          <label>비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            required
          />

          <button type="submit">로그인</button>
        </form>

        <div className="signup-link">
          <p>아직 회원이 아니신가요?</p>
          <button onClick={() => navigate('/signup')}>회원가입 하러 가기</button>
        </div>
      </div>
    </div>
  );
};

export default Login;