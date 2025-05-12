import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import '../styles/Activity.css';
import '../styles/MessageModal.css';
import ActivityForm from '../components/ActivityForm';
import MessageModal from '../components/MessageModal';
import { Post, User } from '../types';
import { deletePost } from '../redux/slices/postSlice';

interface ActivityProps {
  currentUser: User;
}

const Activity: React.FC<ActivityProps> = ({ currentUser }) => {
  const dispatch = useDispatch();
  const allPosts = useSelector((state: RootState) => state.posts.posts);
  const [region, setRegion] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [isWriting, setIsWriting] = useState(false);

  const [messageReceiver, setMessageReceiver] = useState<string | null>(null);

  const filteredPosts = allPosts.filter(
    (post) =>
      (region ? post.region === region : true) &&
      (age ? post.age === age : true) &&
      (gender ? post.gender === gender : true)
  );

  return (
    <div className="activity-container">
      {/* 검색 필터 */}
      <div className="search-section">
        <div className="filters">
          <div className="gender-buttons">
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
            <button
              type="button"
              className={gender === '무관' ? 'selected' : ''}
              onClick={() => setGender('무관')}
            >
              무관
            </button>
          </div>
          <select value={region} onChange={(e) => setRegion(e.target.value)}>
            <option value="">지역 선택</option>
            <option value="서울">서울</option>
            <option value="경기도">경기도</option>
            <option value="충청도">충청도</option>
            <option value="강원도">강원도</option>
            <option value="전라도">전라도</option>
            <option value="경상도">경상도</option>
          </select>
          <select value={age} onChange={(e) => setAge(e.target.value)}>
            <option value="">나이대 선택</option>
            <option value="20대">20대</option>
            <option value="30대">30대</option>
            <option value="40대">40대</option>
          </select>
        </div>
        <button onClick={() => {}} className="search-button">검색</button>
      </div>

      {/* 글쓰기 */}
      <div className="post-create-section">
        <button onClick={() => setIsWriting(true)} className="write-button">하루 친구 구하기</button>
        {isWriting && <ActivityForm currentUser={currentUser} onClose={() => setIsWriting(false)} />}
      </div>

      {/* 글 목록 */}
      <div className="posts-section">
        <h3>활동 글</h3>
        <ul>
          {filteredPosts.length === 0 ? (
            <p>활동 글이 없습니다.</p>
          ) : (
            filteredPosts.map((post: Post) => (
              <li key={post.id}>
                <div className="post-header">
                  <strong>{post.title}</strong>
                  <p className="post-time">작성 시간: {new Date(post.time).toLocaleString()}</p>
                  <p className="post-date">만남 시간: {new Date(post.meetingTime).toLocaleString()}</p>
                  <p className="post-location">장소: {post.location.address}</p>
                </div>
                <p>{post.content}</p>
                <div className="post-info">
                  <p>작성자: {post.author}</p>
                  <p>성별: {post.gender}</p>
                  <p>나이대: {post.age}</p>
                  <p>선호 성별: {post.preferredGender}</p>
                  <p>선호 나이대: {post.preferredAge}</p>
                </div>
                <div className="post-footer">
                  {currentUser.id === post.author && (
                    <button
                      className="delete-button"
                      onClick={() => dispatch(deletePost(post.id))}
                    >
                      삭제
                    </button>
                  )}
                  <button
                    className="message-button"
                    onClick={() => setMessageReceiver(post.author)}
                  >
                    쪽지 보내기
                  </button>
                </div>

                {/* Kakao Map */}
                {post.location.lat && post.location.lng && (
                  <div className="map-container" style={{ height: '300px', width: '100%' }}>
                    <iframe
                      src={`https://map.kakao.com/link/map/${post.title},${post.location.lat},${post.location.lng}`}
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      title="지도"
                    ></iframe>
                  </div>
                )}
              </li>
            ))
          )}
        </ul>
      </div>

      {/* 쪽지 모달 */}
      {messageReceiver && (
        <MessageModal
          receiverId={messageReceiver}
          sender={currentUser}
          onClose={() => setMessageReceiver(null)}
        />
      )}
    </div>
  );
};

export default Activity;
