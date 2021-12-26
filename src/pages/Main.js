import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Layout, Button, Modal } from '@douyinfe/semi-ui'
import RouterConf from '../components/RouterConf'
import RouterVisual from '../components/RouterVisual'
import LoadFileButton from '../components/LoadFileButton'

const MainPage = ({ file, setFile }) => {
  const [selectedDev, setSelectedDev] = useState(0)
  const [newConfig, setNewConfig] = useState(file.content)

  useEffect(() => {
    setNewConfig(file.content)
  }, [file])

  const preSaveConfig = (key, value) => {
    const config = { ...newConfig }
    config[key] = value
    setNewConfig(config)
  }

  const handleSave = () => {
    var FileSaver = require('file-saver')
    var blob = new Blob([JSON.stringify(newConfig)], { type: "text/plain;charset=utf-8" })
    FileSaver.saveAs(blob, `${file.name}.json`)
  }

  const { Content } = Layout
  return (
    <Layout>
      <Content>
        <LoadFileButton file={file} setFile={setFile} hasNew={false} showFileName={true} />
        <Button onClick={handleSave}>Save</Button>
        <Layout>
          <Row gutter={16} justify='space-between'>
            <Col span={10}>
              <Card><RouterVisual config={newConfig} setSelectedDev={setSelectedDev} /></Card>
            </Col>
            <Col span={14}>
              <Card><RouterConf routersConfig={newConfig.routersConfig} preSaveRoutersConfig={preSaveConfig} selectedDev={selectedDev} /></Card>
            </Col>
          </Row>
        </Layout>
      </Content>
    </Layout>
  )
}

export default MainPage