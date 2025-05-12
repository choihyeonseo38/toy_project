export interface Post {
  id: number;
  title: string;
  content: string;
  region: string;
  age: string;               // 나이대 (예: '20대', '30대')
  gender: string;             // 성별 (예: '남성', '여성')
  time: string;               // 작성 시간 (ISO 형식)
  preferredGender: string;    // 선호 성별
  preferredAge: string;       // 선호 나이대
  author: string;             // 작성자 ID (User.id)
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  meetingTime: string;        // 만남 희망 시간 (ISO 형식)
}

export interface User {
  id: string;                 // 사용자 ID (문자열로 통일)
  name: string;               // 이름
  email: string;              // 이메일
  nickname: string;           // 닉네임
  gender: string;             // 성별 (예: '남성', '여성')
  age: string;                 // 나이대 (예: '20대', '30대')
  region: string;             // 지역 (예: '서울')
  profileImage?: string;      // 프로필 이미지 URL (선택 사항)
}
