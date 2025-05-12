// src/redux/types.ts

import { Post } from '../types'; // 공용 타입 임포트

export interface PostState {
  posts: Post[]; // Post 타입 배열
}
