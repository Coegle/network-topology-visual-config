import React, { useEffect, useState } from 'react'
import { Card, Collapse, Typography } from '@douyinfe/semi-ui'
import InfForm from './InfForm'
import StaticRouteConf from './StaticRouteConf'
import InterativeConf from './InterativeConf'
import OSPFConfig from './OSPFConfig'
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
    preSaveRoutersConfig('routersConfig', editedRoutersConfig)
  }
  return (
    <div>
      <Title heading={3}>路由器配置-{routersConfig[selectedDev].routerName}</Title>
      <InfForm initConfig={routerConfig.IPAddrConfig} connection_id={routerConfig.connection_id} preSaveInfConfig={preSaveRouterConfig} />
      <Collapse>
        <Collapse.Panel header="静态路由" itemKey="1">
          <StaticRouteConf initConfig={routerConfig.staticRoute} connection_id={routerConfig.connection_id} preSaveInfConfig={preSaveRouterConfig} />
        </Collapse.Panel>
        <Collapse.Panel header="OSPF" itemKey="2">
        <OSPFConfig initConfig={routerConfig.OSPFConfig} connection_id={routerConfig.connection_id} preSaveInfConfig={preSaveRouterConfig} />
        </Collapse.Panel>
        <Collapse.Panel header="交互式配置" itemKey="3">
          <InterativeConf connection_id={routerConfig.connection_id} />
        </Collapse.Panel>
      </Collapse>
    </div>
  )
}

export default RouterConf