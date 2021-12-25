import { Button } from '@douyinfe/semi-ui'
import React from 'react'
const RouterVisual = ({ devIds, setSelectedDev }) => {

  const onClickConnectRouter = async (routerId) => {
    setSelectedDev(routerId)
  }
  return (
    <div>
      拓扑可视化模块
      <Button onClick={() => onClickConnectRouter(0)}>Router1</Button>
      <Button onClick={() => onClickConnectRouter(1)}>Router2</Button>
      <Button onClick={() => onClickConnectRouter(2)}>Router3</Button>
    </div>
  )
}

export default RouterVisual