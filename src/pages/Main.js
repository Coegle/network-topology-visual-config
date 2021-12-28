import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Layout, Button } from '@douyinfe/semi-ui'
import RouterConf from '../components/RouterConf'
import RouterVisual from '../components/RouterVisual'
import LoadFileButton from '../components/LoadFileButton'
import TestUnit from '../components/TestUnit'

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
    const routersConfig = newConfig.routersConfig.map(it => {
      delete it.connection_id
      return it
    })
    const fileRemovedId = { ...newConfig, routersConfig }
    var FileSaver = require('file-saver')
    var blob = new Blob([JSON.stringify(fileRemovedId)], { type: "text/plain;charset=utf-8" })
    FileSaver.saveAs(blob, `${file.name}.json`)
  }

  const { Content } = Layout
  return (
    <Layout>
      <Content>
        <LoadFileButton file={file} setFile={setFile} hasNew={false} showFileName={true} buttonLabel={'重新加载配置文件'} />
        <Button onClick={handleSave}>另存为</Button>
        <Layout>
          <Row gutter={16} justify='space-between'>
            <Col span={10}>
              <Card style={{marginBottom: "10px"}}><RouterVisual config={newConfig} setSelectedDev={setSelectedDev} /></Card>
              <Card><TestUnit configFile={file} /></Card>
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