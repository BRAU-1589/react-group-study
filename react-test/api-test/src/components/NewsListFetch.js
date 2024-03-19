import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import NewsItem from './NewsItem';


const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const NewsListFetch = ({ category }) => {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const query = category === 'all' ? '' : `&category=${category}`;

        const response = await fetch(
            `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=0a8c4202385d4ec1bb93b7e277b3c51f`
        );
        if (!response.ok) {
          throw new Error('네트워크가 응답하지 않습니다.');
        }
        const json = await response.json();
        setArticles(json.articles);
      } catch (e) {
        console.error("패치 실패", e);
      }
      setLoading(false);
    };
    fetchData();
  }, [category]);

  if (loading) {
    return <NewsListBlock>대기 중...</NewsListBlock>;
  }
  if (!articles) {
    return null;
  }

  return (
      <NewsListBlock>
        {articles.map((article) => (
            <NewsItem key={article.url} article={article} />
        ))}
      </NewsListBlock>
  );
};

export default NewsListFetch;