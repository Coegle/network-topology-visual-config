import React, { useEffect, useState } from 'react'
import { Card, Collapse, Typography } from '@douyinfe/semi-ui'
import InfForm from './InfForm'
const { Title } = Typography

const RouterConf = ({ routersConfig, preSaveRoutersConfig, selectedDev }) => {
  const [routerConfig, setRouterConfig] = useState(routersConfig[selectedDev])
  useEffect(() => {
    setRouterConfig(routersConfig[selectedDev])
  }, [routersConfig, selectedDev])

  const preSaveRouterConfig = (key, value) => {
    const editedRouterConfig = { ...routerConfig }
    editedRouterConfig[key] = value
    const editedRoutersConfig = routersConfig
      .map((it, idx) => idx === selectedDev ? editedRouterConfig : it)
      .map((it) => {
        delete it.connection_id
        return it
      })
    preSaveRoutersConfig('routersConfig', editedRoutersConfig)
  }
  return (
    <div>
      <Title heading={3}>路由器配置</Title>
      <Card><InfForm initConfig={routerConfig.IPAddrConfig} connection_id={routerConfig.connection_id} preSaveInfConfig={preSaveRouterConfig} /></Card>
      <Collapse>
        <Collapse.Panel header="静态路由" itemKey="1">
          <p>静态路由</p>
        </Collapse.Panel>
        <Collapse.Panel header="OSPF" itemKey="2">
          <p>OSPF</p>
        </Collapse.Panel>
        <Collapse.Panel header="交互式配置" itemKey="3">
          <p>交互式配置</p>
        </Collapse.Panel>
        <Collapse.Panel header="脚本测试" itemKey="4">
          <p>交互式配置</p>
        </Collapse.Panel>
      </Collapse>
    </div>
  )
}

export default RouterConf