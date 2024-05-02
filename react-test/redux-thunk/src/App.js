// useDispatch와 useSelector로 리덕스 스토어와 상호작용한다.
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./store/actions/fetchData";

const App = () => {
  const dispatch = useDispatch();
  // 스토어의 data 상태를 가져온다.
  const { loading, data, error } = useSelector((state) => state.data);

  const handleClick = () => {
    // 버튼 클릭하면 fetchData 액션을 디스패치한다.
    dispatch(fetchData());
  };

  return (
    <div>
      <button onClick={handleClick}>데이터 가져오기</button>
      {/* 상태에 따른 UI 렌더링 */}
      {loading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <h1>Error: {error.message}</h1>
      ) : (
        data && <div><h1>{data.title}</h1><h2> userId : {data.userId}</h2></div>
      )}
    </div>
  );
};

export default App;