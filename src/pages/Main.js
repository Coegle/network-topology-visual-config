import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Layout } from '@douyinfe/semi-ui'
import RouterConf from '../components/RouterConf'
import RouterVisual from '../components/RouterVisual'
import LoadFileButton from '../components/LoadFileButton'

const MainPage = ({ file, setFile }) => {
  const [selectedDev, setSelectedDev] = useState(0)
  const [newConfig, setNewConfig] = useState(file.content)
  useEffect(() => {
    setNewConfig(file.content)
  }, [file])

  const { Content } = Layout
  return (
    <Layout>
      <Content>
        <LoadFileButton file={file} setFile={setFile} hasNew={false} showFileName={true} />
        <Layout>
          <Row gutter={16} justify='space-between'>
            <Col span={10}>
              <Card><RouterVisual setSelectedDev={setSelectedDev} /></Card>
            </Col>
            <Col span={14}>
              <Card><RouterConf config={newConfig[selectedDev]} setImptConfig={setNewConfig} /></Card>
            </Col>
          </Row>
        </Layout>
      </Content>
    </Layout>
  )
}

export default MainPage