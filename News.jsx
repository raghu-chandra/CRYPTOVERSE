import React from 'react';
import { Typography, Row, Col, Avatar, Card, Alert } from 'antd';
import moment from 'moment';

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import Loader from './Loader';

const { Text, Title } = Typography;
const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const News = ({ simplified }) => {
  const { data, isFetching, error } = useGetCryptoNewsQuery();
  
  // Debug: Check API response
  console.log('News API Response:', data);

  if (isFetching) return <Loader />;
  if (error) return <Alert message="Error loading news" type="error" />;
  if (!data?.length) return <Alert message="No news available" type="warning" />;

  const newsList = simplified ? data.slice(0, 6) : data;

  return (
    <Row gutter={[24, 24]}>
      {newsList.map((newsItem, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={newsItem.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {newsItem.title || 'No title available'}
                </Title>
                <img
                  style={{ maxWidth: '200px', maxHeight: '100px' }}
                  src={newsItem.thumbnail || demoImage}
                  alt="news"
                />
              </div>
              <p>
                {newsItem.description?.length > 100
                  ? `${newsItem.description.substring(0, 100)}...`
                  : newsItem.description || 'No description available'}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar src={demoImage} alt="" />
                  <Text className="provider-name">
                    {newsItem.source?.name || 'Unknown source'}
                  </Text>
                </div>
                <Text>
                  {newsItem.publishedAt 
                    ? moment(newsItem.publishedAt).fromNow() 
                    : 'Unknown date'}
                </Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;