import React from 'react'
import { Card, Collapse } from '@douyinfe/semi-ui'
import InfForm from './InfForm'

const RouterConf = ({ config, setImptConfig }) => {
  return (
    <div>
      路由器配置模块
      <Card><InfForm initConfig={config.IPAddrConfig} connection_id={config.connection_id} /></Card>
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