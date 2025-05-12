import React, { useState } from 'react';
import { User } from '../types';

interface MessageModalProps {
  receiverId: string;
  sender: User;
  onClose: () => void;
}

const MessageModal: React.FC<MessageModalProps> = ({ receiverId, sender, onClose }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!message.trim()) return;

    // 이 부분에서 서버나 WebSocket 등으로 전송 가능
    console.log('쪽지 보냄:', {
      from: sender.id,
      to: receiverId,
      content: message,
      timestamp: new Date().toISOString(),
    });

    alert('쪽지가 전송되었습니다!');
    setMessage('');
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{receiverId}님에게 쪽지 보내기</h3>
        <textarea
          placeholder="쪽지 내용을 입력하세요..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="modal-buttons">
          <button onClick={handleSend}>보내기</button>
          <button onClick={onClose}>닫기</button>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
