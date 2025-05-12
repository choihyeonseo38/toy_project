import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost } from '../redux/slices/postSlice';
import { Post, User } from '../types';

interface ActivityFormProps {
  currentUser: User;
  onClose: () => void;
}

declare global {
  interface Window {
    kakao: any;
  }
}

const ActivityForm: React.FC<ActivityFormProps> = ({ currentUser, onClose }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [preferredGender, setPreferredGender] = useState('');
  const [preferredAge, setPreferredAge] = useState('');
  const [meetingTime, setMeetingTime] = useState('');
  const [region, setRegion] = useState('서울');
  const [location, setLocation] = useState('');
  const [coords, setCoords] = useState({ lat: 0, lng: 0 });

  // Kakao SDK 동적 로드
  const loadKakaoSdk = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (window.kakao && window.kakao.maps) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src =
        'https://dapi.kakao.com/v2/maps/sdk.js?appkey=b101df8730d1b0213a22d21f7e29186b&autoload=false&libraries=services';
      script.async = true;
      script.onload = () => {
        window.kakao.maps.load(resolve);
      };
      script.onerror = reject;

      document.head.appendChild(script);
    });
  };

  // 주소 → 좌표 변환
  const geocodeAddress = async (address: string): Promise<{ lat: number; lng: number }> => {
    await loadKakaoSdk();

    return new Promise((resolve, reject) => {
      const geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.addressSearch(address, (result: any, status: any) => {

        if (status === window.kakao.maps.services.Status.OK) {
          const { y, x } = result[0];
          resolve({ lat: parseFloat(y), lng: parseFloat(x) });
        } else {
          reject('주소를 찾을 수 없습니다.');
        }
      });
    });
  };

  // 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('사용자 입력 meetingTime (raw):', meetingTime);

    if (!meetingTime) {
      alert('만남 날짜와 시간을 선택해주세요.');
      return;
    }

    try {
      const coords = await geocodeAddress(location);
      setCoords(coords);

      const meetingTimeISO = new Date(meetingTime).toISOString();
      const nowISO = new Date().toISOString();

      const newPost: Post = {
        id: Date.now(),
        title,
        content,
        region,
        age: currentUser.age,
        gender: currentUser.gender,
        time: nowISO, // 글 작성 시간
        meetingTime: meetingTimeISO, // 만남 희망 시간
        preferredGender,
        preferredAge,
        author: currentUser.id,
        location: {
          lat: coords.lat,
          lng: coords.lng,
          address: location,
        },
      };

      dispatch(addPost(newPost));
      onClose();
    } catch (error) {
      console.error(error);
      alert('주소를 찾을 수 없습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <input
        type="text"
        placeholder="활동 제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="본문을 입력하세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <input
        type="datetime-local"
        value={meetingTime}
        onChange={(e) => setMeetingTime(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="장소 주소 (예: 서울특별시 마포구 월드컵북로 400)"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />
      <select value={preferredGender} onChange={(e) => setPreferredGender(e.target.value)}>
        <option value="">선호 성별</option>
        <option value="남성">남성</option>
        <option value="여성">여성</option>
        <option value="무관">무관</option>
      </select>
      <select value={preferredAge} onChange={(e) => setPreferredAge(e.target.value)}>
        <option value="">선호 나이대</option>
        <option value="20대">20대</option>
        <option value="30대">30대</option>
        <option value="30대">40대</option>
      </select>
      <button type="submit" className="submit-button">글쓰기</button>
    </form>
  );
};

export default ActivityForm;

