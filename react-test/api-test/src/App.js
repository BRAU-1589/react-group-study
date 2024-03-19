/*
import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState(null);
  const onClick = async () => {
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/todos/1'
      );
      setData(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <div>
        <button onClick={onClick}>불러오기</button>
      </div>
      {data && (
        <textarea
          rows={7}
          value={JSON.stringify(data, null, 2)}
          readOnly={true}
        />
      )}
    </div>
  );
};

export default App;
*/

/*
import Newslist from '. /components/Newslist ' ; 
import Categories from './components/Categories ' ; 

    
  const App = () => {
      return (
        <>
          <Categories />
          <Newslist />
        </>
      );
  }

export default App; 
*/

import React, { useState, useCallback } from 'react';
//import NewsListAxios from './components/NewsListAxios';
//import NewsListFetch from './components/NewsListFetch';
//import Categories from './components/Categories';

//라우트 테스트 시작
import {Route, Routes} from 'react-router-dom';
import NewsPage from './components/NewsPage';

const App = () => {


  return (
    <>

      {/*<Categories category={category} onSelect={onSelect} />*/}
      {/*<NewsListAxios category={category} />*/}
      {/*<NewsListFetch category={category} />*/}


        <Routes>
            <Route path="/:category?" element={<NewsPage />} />
        </Routes>


    </>
  );
};

export default App;
