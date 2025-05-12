import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Signup.css';
import { Link } from 'react-router-dom';

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const [phone, setPhone] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [mbti, setMbti] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [gender, setGender] = useState('');
  const [region, setRegion] = useState('');
  const [subRegion, setSubRegion] = useState('');

  const handlePhoneVerification = () => {
    alert(`인증번호가 ${authCode}로 전송되었습니다.`);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    alert('회원가입 성공');
    navigate('/login');
  };

  return (
    <div className="signup-container">
      <div className="home-btn-container">
        <Link to="/" className="home-btn">홈</Link> {/* 홈 버튼 링크 */}
      </div>
      
      <div className="signup-card">
        <h2>회원가입</h2>
        <form onSubmit={handleSignUp}>
          <label>전화번호 (아이디)</label>
          <div className="phone-input">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="010-0000-0000"
              required
            />
            <button type="button" onClick={handlePhoneVerification}>
              인증번호 받기
            </button>
          </div>

          <label>인증번호</label>
          <input
            type="text"
            value={authCode}
            onChange={(e) => setAuthCode(e.target.value)}
            placeholder="인증번호 입력"
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

          <label>닉네임</label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임을 입력하세요"
            required
          />

          <label>MBTI</label>
          <input
            type="text"
            value={mbti}
            onChange={(e) => setMbti(e.target.value)}
            placeholder="MBTI를 입력하세요"
          />

          <label>나이</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            placeholder="나이를 입력하세요"
            required
          />

          <label>성별</label>
          <div className="gender-select">
            <button
              type="button"
              className={gender === '남성' ? 'selected' : ''}
              onClick={() => setGender('남성')}
            >
              남성
            </button>
            <button
              type="button"
              className={gender === '여성' ? 'selected' : ''}
              onClick={() => setGender('여성')}
            >
              여성
            </button>
          </div>

          <label>지역</label>
          <div className="region-select">
            <select value={region} onChange={(e) => setRegion(e.target.value)}>
              <option value="">지역 선택</option>
              <option value="경기도">경기도</option>
              <option value="서울">서울</option>
            </select>

            <select value={subRegion} onChange={(e) => setSubRegion(e.target.value)} disabled={!region}>
              <option value="">구/시 선택</option>
              {region === '경기도' && (
                <>
                  <option value="안산시">안산시</option>
                  <option value="수원시">수원시</option>
                </>
              )}
              {region === '서울' && (
                <>
                  <option value="강남구">강남구</option>
                  <option value="종로구">종로구</option>
                </>
              )}
            </select>
          </div>

          <button type="submit">회원가입</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
