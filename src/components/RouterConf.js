import React from 'react'
import InfForm from './InfForm'

const RouterConf = ({ config, setImptConfig }) => {
  const style = {
    'height': '300px'
  }
  return (
    <div style={style}>
      路由器配置模块
      <InfForm initConfig={config.IPAddrConfig} />

    </div>
  )
}

export default RouterConf