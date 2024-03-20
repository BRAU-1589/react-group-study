import React, { useState, useEffect, memo } from 'react';
import styled from 'styled-components';
import NewsItem from './NewsItem';
import axios from 'axios';
//REACT_APP_NEWS_API_KEY=0a8c4202385d4ec1bb93b7e277b3c51f

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

const MemoNewsItem = memo(NewsItem);

const fetchNews = async (category) => {
  const query = category === 'all' ? '' : `&category=${category}`;
  const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
  );
  return response.data.articles;
};

const NewsListAxios = ({ category }) => {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchNews(category)
        .then((articles) => setArticles(articles))
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
  }, [category]);

  if (loading) return <NewsListBlock>대기 중...</NewsListBlock>;
  if (error) return <NewsListBlock>에러 발생!</NewsListBlock>;
  if (!articles) return null;

  return (
      <NewsListBlock>
        {articles.map((article) => (
            <MemoNewsItem key={article.url} article={article} />
        ))}
      </NewsListBlock>
  );
};

export default NewsListAxios;