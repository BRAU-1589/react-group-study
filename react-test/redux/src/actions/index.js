// actions/index.js
// 액션 생성 함수 확인
//액션 생성 함수에서 액션 타입 상수를 정확히 임포트하고 있는지 확인
import { INCREMENT, DECREMENT } from './types';

export const increment = () => ({
  type: INCREMENT,
});

export const decrement = () => ({
  type: DECREMENT,
});
