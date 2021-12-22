import { Button, Toast } from '@douyinfe/semi-ui'
import React from 'react'
import NetworkApi from '../services/api'
import FakeConfig from '../fakeConfig'
const RouterVisual = ({ devIds, setSelectedDev }) => {

  const onClickConnectRouter = async (routerId) => {
    setSelectedDev(routerId)
    try {
      await NetworkApi.connectRouter(routerId)
    } catch (excep) {
      if (!FakeConfig.FakeBackend) {
        Toast.info(excep.message)
      }
    }
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