import React, { useState, FC } from 'react';
import { User } from '../types';
import '../styles/MyProfile.css';

interface MyProfileProps {
  currentUser: User;
}

const MyProfile: FC<MyProfileProps> = ({ currentUser }) => {
  const [nickname, setNickname] = useState(currentUser.nickname);
  const [profileImage, setProfileImage] = useState<string | null>(currentUser.profileImage || null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    alert('프로필 정보가 저장되었습니다.');
    // 서버에 닉네임, 이미지 업로드 API 호출 자리
  };
  

  return (
    <div className="profile-container">
      <h2>내 정보</h2>

      <div className="profile-image-section">
        <img
          src={profileImage || '/default-profile.png'}
          alt="프로필 사진"
          className="profile-image"
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>

      <div className="profile-info">
        <label>닉네임</label>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />

        <p><strong>성별:</strong> {currentUser.gender}</p>
        <p><strong>나이:</strong> {currentUser.age}</p>
        <p><strong>지역:</strong> {currentUser.region}</p>

        <button onClick={handleSave}>저장하기</button>
      </div>
    </div>
  );
};

export default MyProfile;
