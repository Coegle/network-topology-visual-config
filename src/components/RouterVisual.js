import { Button, Modal, Toast,Card,  Col, Row} from '@douyinfe/semi-ui'
import React from 'react'
import NetworkApi from '../services/api'
import Picture from './Picture';
import Test from './test'
const RouterVisual = ({ devIds, setSelectedDev }) => {

  const onClickConnectRouter = async (routerId) => {
    setSelectedDev(routerId)
    const result = await NetworkApi.connectRouter(routerId)
    const opts = {
      content: JSON.stringify(result),
      duration: 3,
    }
    Toast.info(opts)
  }
  
  return (
    <div>
      <Row>
        拓扑可视化模块
        <Button onClick={() => onClickConnectRouter(0)}>Router1</Button>
        <Button onClick={() => onClickConnectRouter(1)}>Router2</Button>
        <Button onClick={() => onClickConnectRouter(2)}>Router3</Button>
      </Row>
      <br/>
      <br/>
      <br/>
      <Row>
          <Card><Picture /></Card>
      </Row>
    </div>

  )
}

export default RouterVisual