import { combineReducers } from 'redux';
import dataReducer from './dataReducer';
// 여러 개의 리듀서를 하나로 합친다.
const rootReducer = combineReducers({
  data: dataReducer,
});

export default rootReducer;