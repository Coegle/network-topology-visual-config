import { Card, Row } from '@douyinfe/semi-ui'
import React from 'react'
import Picture from './Picture';
import router from '../image/router.png'

const RouterVisual = ({ config, setSelectedDev }) => {

  const nodeArray = config.routersConfig.map((it, idx) => {
    // { key : 0, name: 'R1', img: router }
    return { key: idx, name: it.routerName, img: router }
  })

  const dataArray = config.links.map((it, idx) => {
    // { key: -1, from: 0, to: 1, text: '192.168.2.0', srcInf: 's0/0/0', dstInf: 's0/0/0' },
    return {
      key: idx,
      from: it.from.routerIdx,
      to: it.to.routerIdx,
      text: it.network,
      srcInf: it.from.interface,
      dstInf: it.to.interface
    }
  })

  return (
    <div>
      <Row>
        拓扑可视化模块
        <Card><Picture nodeArray={nodeArray} dataArray={dataArray} setSelectedDev={setSelectedDev} /></Card>
      </Row>
    </div>

  )
}

export default RouterVisual