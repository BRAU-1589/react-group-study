// 비동기 작업을 위한 액션 생성자다.
export const fetchData = () => {
  return (dispatch, getState) => {
    dispatch({ type: 'FETCH_START' });
    
    fetch('https://jsonplaceholder.typicode.com/todos/2')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      })
      .catch(error => {
        dispatch({ type: 'FETCH_ERROR', payload: error });
      });
  };
};
