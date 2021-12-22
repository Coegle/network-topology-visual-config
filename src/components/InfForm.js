import React, { createRef, useState, useEffect } from 'react'
import { Col, Row, Form, Button, ArrayField, Toast } from '@douyinfe/semi-ui'


const InfForm = ({ initConfig }) => {
  const [confState, setConfState] = useState([false, false, false, false])
  const [currentConf, setCurrentConf] = useState(initConfig)
  const formRef = createRef()
  useEffect(() => {
    formRef.current.formApi.setValue('config', initConfig)
  }, [initConfig])

  const onSubmit = event => {
    const idx = event.currentTarget.dataset.idx
    disableConfSetting(idx)
    const values = formRef.current.formApi.getValues()
    console.log(values);
    formRef.current.formApi.setValues(values)
    setCurrentConf(values)
  }
  const onClickReset = event => {
    const idx = event.currentTarget.dataset.idx
    formRef.current.formApi.setValues(currentConf)
    disableConfSetting(idx)
  }

  const onClickEdit = event => {
    const idx = event.currentTarget.dataset.idx
    disableConfSetting(idx)
  }

  const disableConfSetting = p => {
    setConfState(confState.map((val, idx) => idx === Number(p) ? !val : val))
  }
  const onGet = () => {
    const values = formRef.current.formApi.getValues()
    Toast.info(JSON.stringify(values))
  }
  return (
    <div>
      <Button onClick={onGet}>Get</Button>
      <Row>
        <Col span={4}>
          <div>端口</div>
        </Col>
        <Col span={10}>
          <div>IP地址/掩码</div>
        </Col>
        <Col span={2}>
          <div>状态</div>
        </Col>
      </Row>
      <Form ref={formRef} layout='horizontal' style={{ flexDirection: 'column' }}>
        <ArrayField field='config'>
          {
            ({ arrayFields }) => (
              <>
                {arrayFields.map(({ field, key }, idx) =>
                  <Row key={key}>
                    <Col span={4}> {initConfig[idx].name} </Col>
                    <Col span={10}>
                      <Form.InputGroup noLabel >
                        <Form.Input field={`${field}[ipAddr]`} disabled={!confState[idx]} style={{ width: 140 }} />
                        <Form.Input field={`${field}[ipMask]`} disabled={!confState[idx]} style={{ width: 130 }} />
                      </Form.InputGroup>
                    </Col>
                    <Col span={2}> {initConfig[idx].state} </Col>
                    <Col span={4}>
                      {confState[idx]
                        ? <Button data-idx={idx} onClick={onSubmit} >确定</Button>
                        : <Button data-idx={idx} onClick={(onClickEdit)} >编辑</Button>
                      }
                      {confState[idx] ? <Button data-idx={idx} onClick={onClickReset} >取消</Button> : null}
                    </Col>
                  </Row>)}
              </>
            )
          }
        </ArrayField>
      </Form>

    </div>
  )

}

export default InfForm