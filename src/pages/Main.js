import React, { useState } from 'react'
import { Card, Row, Col, Button, Layout } from '@douyinfe/semi-ui'
import RouterConf from '../components/RouterConf'
import RouterVisual from '../components/RouterVisual'
import FakeConfig from '../fakeConfig'

const MainPage = () => {
  const [imptConfig, setImptConfig] = useState(FakeConfig.IPAddrConfigs)
  const [selectedDev, setSelectedDev] = useState(0)
  const { Content } = Layout
  return (
    <Layout>
      <Content>
        <Button style={{ marginBottom: '10px' }}>重新导入配置文件</Button>
        <Layout>
          <Row gutter={16} justify='space-between'>
            <Col span={10}>
              <Card><RouterVisual setSelectedDev={setSelectedDev} /></Card>
            </Col>
            <Col span={14}>
              <Card><RouterConf config={imptConfig[selectedDev]} setImptConfig={setImptConfig} /></Card>
            </Col>
          </Row>
        </Layout>
      </Content>
    </Layout>
  )
}

export default MainPage