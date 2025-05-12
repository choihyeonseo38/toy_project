// src/pages/Chat.tsx

import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import type { Socket } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { User } from '../types';


interface ChatProps {
    currentUser: User;
  }
  
  interface Message {
    sender: string;
    content: string;
    timestamp: string;
  }
  
  const socket = io('http://localhost:3001'); // ✅ 그대로 유지
  
  const Chat: React.FC<ChatProps> = ({ currentUser }) => {
    const { id: receiverId } = useParams<{ id: string }>();
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
  
    const currentUserId = currentUser.id;
  
    useEffect(() => {
      socket.emit('join', { userId: currentUserId });
  
      socket.on('message', (msg: Message) => {
        setMessages((prev) => [...prev, msg]);
      });
  
      return () => {
        socket.off('message');
        socket.emit('leave', { userId: currentUserId });
      };
    }, [currentUserId]);
  
    const sendMessage = () => {
      if (!input.trim()) return;
      const newMessage: Message = {
        sender: currentUserId,
        content: input,
        timestamp: new Date().toISOString(),
      };
      socket.emit('message', { to: receiverId, message: newMessage });
      setMessages((prev) => [...prev, newMessage]);
      setInput('');
    };
  
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
  
    useEffect(() => {
      scrollToBottom();
    }, [messages]);
  
    return (
      <div className="flex flex-col h-screen p-4">
        <h1 className="text-xl font-bold mb-2">채팅 상대: {receiverId}</h1>
        <div className="flex-1 overflow-y-auto border rounded p-2 bg-gray-50">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-2 my-1 rounded max-w-xs ${
                msg.sender === currentUserId ? 'bg-blue-200 self-end ml-auto' : 'bg-gray-300 self-start'
              }`}
            >
              <div className="text-sm">{msg.content}</div>
              <div className="text-xs text-gray-600">{new Date(msg.timestamp).toLocaleTimeString()}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex mt-2">
          <input
            className="flex-1 border p-2 rounded-l"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="메시지를 입력하세요"
          />
          <button className="bg-blue-500 text-white px-4 rounded-r" onClick={sendMessage}>
            보내기
          </button>
        </div>
      </div>
    );
  };
  
  export default Chat;