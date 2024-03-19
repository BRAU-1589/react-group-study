// import React from 'react';
// import { useParams } from 'react-router-dom'; // Import useParams
// import Categories from './Categories';
// import NewsListAxios from './NewsListAxios';
//
// const NewsPage = () => {
//     const { category } = useParams();
//
//     const categoryValue = category || 'all';
//
//     return (
//         <>
//             <Categories />
//             <NewsListAxios category={categoryValue} />
//         </>
//     );
// };
//
// export default NewsPage;


import React from 'react';
import { useParams } from 'react-router-dom';
import Categories from './CategoriesRoute';
import NewsListAxios from './NewsListAxios';

const NewsPage = () => {
    const { category = 'all' } = useParams();

    return (
        <>
            <Categories />
            <NewsListAxios category={category} />
        </>
    );
};

export default NewsPage;