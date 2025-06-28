import React from 'react';
import { Row, Col, Typography, Avatar, Collapse } from 'antd';
import millify from 'millify';
import Loader from './Loader';
import { useGetExchangesQuery } from '../services/cryptoExchangeApi';

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { data: exchangesList, isFetching } = useGetExchangesQuery();

  if (isFetching) return <Loader />;

  return (
    <>
      <Row className="exchange-heading">
        <Col span={6}><Text strong>Exchange</Text></Col>
        <Col span={6}><Text strong>Trust Score</Text></Col>
        <Col span={6}><Text strong>Volume (24h)</Text></Col>
        <Col span={6}><Text strong>Year Established</Text></Col>
      </Row>

      <Row>
        {exchangesList?.map((exchange) => (
          <Col span={24} key={exchange.id}>
            <Collapse>
              <Panel
                showArrow={false}
                header={
                  <Row align="middle">
                    <Col span={6}>
                      <Avatar src={exchange.image} />
                      <Text strong style={{ marginLeft: 10 }}>{exchange.name}</Text>
                    </Col>
                    <Col span={6}>{exchange.trust_score || 'N/A'}</Col>
                    <Col span={6}>${millify(exchange.trade_volume_24h_btc || 0)} BTC</Col>
                    <Col span={6}>{exchange.year_established || 'N/A'}</Col>
                  </Row>
                }
              >
                <p><strong>Country:</strong> {exchange.country || 'Unknown'}</p>
                <p><a href={exchange.url} target="_blank" rel="noreferrer">Visit Website</a></p>
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;
