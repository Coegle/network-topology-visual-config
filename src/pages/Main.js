import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Card, Row, Col, Layout, Button, Toast, Spin } from '@douyinfe/semi-ui'
import RouterConf from '../components/RouterConf'
import RouterVisual from '../components/RouterVisual'
import LoadFileButton from '../components/LoadFileButton'
import TestUnit from '../components/TestUnit'
import api from '../services/api'

const MainPage = ({ file, setFile }) => {
  const [selectedDev, setSelectedDev] = useState(0)
  const [newConfig, setNewConfig] = useState(file.content)
  const [reloading, setReloading] = useState(false)
  const [configing, setConfiging] = useState(false)
  const history = useHistory()

  const configAll = async () => {
    let allSuccess = 1
    setConfiging(true)
    for (const [idx1, router] of newConfig.routersConfig.entries()) {
      // interface
      for (const [idx2, ipAddr] of router.IPAddrConfig.entries()) {
        if (ipAddr.configurable !== undefined && ipAddr.ip_addr !== undefined && ipAddr.netMask !== undefined) {
          try {
            const result = await api.configIPAddr({
              connection_id: router.connection_id,
              interfaceNum: ipAddr.abbr,
              ...ipAddr
            })
            console.log(result);
          } catch (excep) {
            allSuccess = 0
            Toast.error(`配置 ${router.routerName} ${idx2} 失败！`)
            break
          }
        }
      }
      // static route
      if (router.staticRoute !== undefined) {
        for (const [idx2, staticRoute] of router.staticRoute.entries()) {
          if (staticRoute.interfaceNum !== undefined && staticRoute.ip_addr !== undefined && staticRoute.netMask !== undefined) {
            try {
              const result = await api.configStaticRoute({
                connection_id: router.connection_id,
                ...staticRoute
              })
              console.log(result);
            } catch (excep) {
              allSuccess = 0
              Toast.error(`配置 ${router.routerName} ${idx2} 失败！`)
              break
            }
          }
        }
      }
      // ospf
      // console.log("!!!!!",router.OSPFConfig);
      if (router.OSPFConfig !== undefined) {
        for (const [idx2, ospf] of router.OSPFConfig.entries()) {
          if (ospf.ospf_id !== undefined && ospf.area_id !== undefined && ospf.ip_addr !== undefined && ospf.netMask !== undefined) {
            try {
              const result = await api.configOSPFArea({
                connection_id: router.connection_id,
                ...ospf
              })
              console.log(result);
            } catch (excep) {
              allSuccess = 0
              Toast.error(`配置 ${router.routerName} ${idx2} 失败！`)
              break
            }
          }
        }
      }
    }
    setConfiging(false)
    if (allSuccess) {
      Toast.success('一键配置成功！')
    }
  }

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

  const reset = async () => {
    setReloading(true)
    for (const [idx, it] of newConfig.routersConfig.entries()) {
      try {
        const { echo } = await api.reset({ connection_id: it.connection_id })
        console.log(echo);
      }
      catch (excep) {
        Toast.error(`重置${it.routerName}失败！`)
      }
    }
    setReloading(false)
    history.push('/')
  }

  const reload = async () => {
    setReloading(true)
    for (const [idx, it] of newConfig.routersConfig.entries()) {
      try {
        const { echo } = await api.reload({ connection_id: it.connection_id })
        console.log(echo);
      }
      catch (excep) {
        Toast.error(`重启${it.routerName}失败！`)
      }
      setReloading(false)
      history.push('/')
    }
  }

  const getLinkState = async ({ linkIdx }) => {
    const linkFrom = newConfig.links[linkIdx].from
    const fromPort = linkFrom.interface
    const connection_id = newConfig.routersConfig[linkFrom.routerIdx].connection_id
    try {
      const { success } = await api.testInf({
        connection_id,
        command: `show ip interface brief ${fromPort}`
      })
      if (success) {
        Toast.success('链路连接成功！')
      }
      else {
        Toast.error('链路连接失败！')
      }
      return success
    }
    catch {
      Toast.error('链路连接失败！')
    }
  }
  const { Content } = Layout
  return (
    <Layout>
      <Content>
        <LoadFileButton file={file} setFile={setFile} hasNew={false} showFileName={true} buttonLabel={'重新加载配置文件'} />
        <Button onClick={handleSave}>另存为</Button>
        {
          reloading
            ? <Spin style={{ marginLeft: 10 }} />
            : <Button style={{ marginLeft: 10 }} onClick={reload}>清空配置</Button>
        }
        {
          configing 
          ? <Spin style={{ marginLeft: 10 }} />
          :  <Button style={{ marginLeft: 10 }} onClick={configAll}>一键配置</Button>
        }
        <Layout>
          <Row gutter={16} justify='space-between'>
            <Col span={10}>
              <Card style={{ marginBottom: "10px" }}>
                <RouterVisual config={newConfig} setSelectedDev={setSelectedDev} getLinkState={getLinkState} />
              </Card>
              <Card>
                <TestUnit configFile={file} />
              </Card>
            </Col>
            <Col span={14}>
              <Card>
                <RouterConf routersConfig={newConfig.routersConfig} preSaveRoutersConfig={preSaveConfig} selectedDev={selectedDev} />
              </Card>
            </Col>
          </Row>
        </Layout>
      </Content>
    </Layout>
  )
}

export default MainPage