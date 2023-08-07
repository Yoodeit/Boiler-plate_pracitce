import { combineReducers } from "redux";
import user from './user_reducer';
// store에 reducer가 여러 개 있을 수 있다.
// 변한 state 값을 반환해주는 역할을 하는 것이 Reducer
// combineReducers를 이용해 이러한 Reducer를 root reducer 하나로 합쳐주는 거임.

//import user from './user_reducer';
//user 관련 정보값은 user reducer에서 처리해줌.

const rootReducer = combineReducers({
    user
    // 그리고 rootReducer로 userReducer를 합쳐줌.
})

export default rootReducer;