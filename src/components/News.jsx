import React, { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';

const { Text, Title } = Typography;
const { Option } = Select;

const templateImg = 'https://live-production.wcms.abc-cdn.net.au/f2d1862c8ecf2f039ad4053209ccc27b?impolicy=wcms_crop_resize&cropH=2813&cropW=5000&xPos=0&yPos=513&width=862&height=485'

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
  // const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory: 'cryptoCurrency', count: simplified ? 10 : 100});
  const data = useGetCryptoNewsQuery();
  const { data: cryptosList } = useGetCryptosQuery(100);
  const cryptoNewsData = data?.data;

  if (!data?.data) return <Loader />;

  let cryptoNews = data?.data?.data;

  if (simplified) {
    cryptoNews = cryptoNews.slice(0, 6)
  } else {
    cryptoNews = cryptoNews.slice(0, 12)
  }

  return (
    <Row gutter={[24, 24]}>
      {/* {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className='select-news'
            placeholder='Select a Crypto'
            optionFilterProp='children'
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              <Option value="Cryptocurrency">Cryptocurrency</Option>
              {cryptosList?.data?.coins.map((coin) => <Option value={coin.name}>{coin.name}</Option>)}
          </Select>
        </Col>
      )} */}
  
      {cryptoNews.map((news, index) => (
        <Col xs={24} sm={12} lg={8} key={index}>
          <Card hoverable className='news-card'>
            <a href={news.url} target='_blank' rel='noreferrer'>
              <div className='news-image-container'>
                <Title className='news-title' level={4}>{news.title}</Title>
                <img src={news?.thumbnail || templateImg} alt="news"/>
              </div>
              <p>
                {news.description > 100
                ? `${news.description.substring(0, 100)}...`
                : news.description
                }
              </p>
              <div className='provider-container'>
                {/* <div>
                  <Avatar src={news?.thumbnail || templateImg} alt="news"/>
                </div> */}
                  <Text>{moment(news.createdAt).startOf('ss').fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default News
