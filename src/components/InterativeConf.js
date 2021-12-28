import { Button, Form, TextArea, Toast } from '@douyinfe/semi-ui'
import React, { useState } from 'react'
import api from '../services/api'
import configs from '../utils/configs'

const InterativeConf = ({ connection_id }) => {
  const [echo, setEcho] = useState('')

  const sendCommand = async (values) => {
    const command = values.command
    try {
      const { echo } = await api.sendCommand({ connection_id, command })
      setEcho(echo)
    } catch (excep) {
      if (!configs.fakeBackend) {
        Toast.error('出错了！')
      }
    }
  }
  return (
    <>
      <Form
        layout="horizontal"
        onSubmit={sendCommand}>
        <Form.Input size='large' noLabel field="command" style={{ width: 400 }} showClear autosize />
        <Button type="primary" htmlType="submit">配置</Button>
      </Form>
      <TextArea value={echo} style={{ marginTop: 10 }} readonly rows={10} />
      <Button type="primary" onClick={() => setEcho('')} style={{ marginTop: 12 }}>清屏</Button>
    </>
  )
}
export default InterativeConf