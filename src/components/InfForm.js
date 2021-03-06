import React, { createRef, useState, useEffect } from 'react'
import { Col, Row, Form, Button, ArrayField, Toast } from '@douyinfe/semi-ui'
import API from '../services/api'

const InfForm = ({ initConfig, connection_id, preSaveInfConfig }) => {
  const [confState, setConfState] = useState([false, false, false, false])
  const [currentConf, setCurrentConf] = useState({ IPAddrConfig: initConfig })
  const formRef = createRef()

  useEffect(() => {
    // console.log('initConfig', initConfig);
    setCurrentConf({ IPAddrConfig: initConfig })
    formRef.current.formApi.setValue('IPAddrConfig', initConfig)
  }, [initConfig])

  useEffect(() => {
    // Toast.info(JSON.stringify(currentConf))
    preSaveInfConfig('IPAddrConfig', currentConf.IPAddrConfig)
  }, [currentConf])

  const onSubmit = event => {
    const idx = event.currentTarget.dataset.idx
    disableConfSetting(idx)
    const values = formRef.current.formApi.getValues()
    // console.log(values);
    formRef.current.formApi.setValues(values)
    setCurrentConf(values)
  }

  const onClickReset = event => {
    const idx = event.currentTarget.dataset.idx
    // console.log('currentConf', currentConf)
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
    try{
      await API.configIPAddr({
        connection_id,
        interfaceNum: interfaceConfig.abbr,
        ip_addr: interfaceConfig.ip_addr,
        netMask: interfaceConfig.netMask
      })
      Toast.success(`${interfaceConfig.abbr}端口配置成功！`)
    }
    catch (excep) {
      Toast.error(`${interfaceConfig.abbr}端口配置失败！`)
    }
  }

  const disableConfSetting = p => {
    setConfState(confState.map((val, idx) => idx === Number(p) ? !val : val))
  }

  const formRowStyle = {
    display: "flex",
    alignItems: "center"
  }
  return (
    <div style={{ padding: "20px 10px 0px 20px" }}>
      <Row style={{ display: 'flex', alignItems: 'center' }}>
        <Col span={2}>
          <div>端口</div>
        </Col>
        <Col span={11}>
          <div>IP地址/掩码</div>
        </Col>
      </Row>
      <Form
        ref={formRef}
        layout='horizontal'
        style={{ flexDirection: 'column' }}
        // onChange={values => console.log("formValue", values)}
      >
        <ArrayField field='IPAddrConfig'>
          {
            ({ arrayFields }) => (
              <>
                {arrayFields.map(({ field, key }, idx) =>
                  <Row key={key} style={formRowStyle}>
                    <Col span={2}> {initConfig[idx].abbr} </Col>
                    <Col span={11}>
                      <Form.InputGroup noLabel >
                        <Form.Input field={`${field}[ip_addr]`} disabled={!confState[idx]} style={{ width: 127 }} />
                        <Form.Input field={`${field}[netMask]`} disabled={!confState[idx]} style={{ width: 127 }} />
                      </Form.InputGroup>
                    </Col>
                    <Col span={5}>
                      {confState[idx]
                        ? <Button data-idx={idx} onClick={onSubmit} style={{marginRight: "2px"}}>确定</Button>
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