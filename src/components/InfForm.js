import React, { createRef, useState, useEffect } from 'react'
import { Col, Row, Form, Button, ArrayField, Toast } from '@douyinfe/semi-ui'
import API from '../services/api'

const InfForm = ({ initConfig, connection_id }) => {
  const [confState, setConfState] = useState([false, false, false, false])
  const [currentConf, setCurrentConf] = useState({ IPAddrConfig: initConfig })
  const formRef = createRef()
  
  useEffect(() => {
    console.log('initConfig', initConfig);
    setCurrentConf({ IPAddrConfig: initConfig })
    formRef.current.formApi.setValue('IPAddrConfig', initConfig)
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
    console.log('currentConf', currentConf)
    formRef.current.formApi.setValues(currentConf)
    disableConfSetting(idx)
  }

  const onClickEdit = event => {
    const idx = event.currentTarget.dataset.idx
    disableConfSetting(idx)
  }

  const onClickSendConfig = async event => {
    const idx = event.currentTarget.dataset.idx
    const interfaceConfig = currentConf.IPAddrConfig[idx]
    await API.configIPAddr({
      connection_id,
      interfaceNum: interfaceConfig.abbr,
      ip_addr: interfaceConfig.ip_addr,
      netMask: interfaceConfig.netMask
    })
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
        <Col span={9}>
          <div>IP地址/掩码</div>
        </Col>
        <Col span={1}>
          <div>状态</div>
        </Col>
      </Row>
      <Form
        ref={formRef}
        layout='horizontal'
        style={{ flexDirection: 'column' }}
        onChange={values => console.log("formValue", values)}
      >
        <ArrayField field='IPAddrConfig'>
          {
            ({ arrayFields }) => (
              <>
                {arrayFields.map(({ field, key }, idx) =>
                  <Row key={key}>
                    <Col span={4}> {initConfig[idx].name} </Col>
                    <Col span={9}>
                      <Form.InputGroup noLabel >
                        <Form.Input field={`${field}[ip_addr]`} disabled={!confState[idx]} style={{ width: 140 }} />
                        <Form.Input field={`${field}[netMask]`} disabled={!confState[idx]} style={{ width: 130 }} />
                      </Form.InputGroup>
                    </Col>
                    <Col span={1}> up </Col>
                    <Col span={4}>
                      {confState[idx]
                        ? <Button data-idx={idx} onClick={onSubmit} >确定</Button>
                        : <Button data-idx={idx} onClick={(onClickEdit)} disabled={!initConfig[idx].configurable} >编辑</Button>
                      }
                      {confState[idx] ? <Button data-idx={idx} onClick={onClickReset} >取消</Button> : null}
                    </Col>
                    <Col span={2}>
                      {
                        initConfig[idx].configurable && !confState[idx]
                          ? <Button data-idx={idx} onClick={onClickSendConfig} >配置</Button>
                          : null
                      }
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