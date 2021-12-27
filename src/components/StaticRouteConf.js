import React, { createRef, useState, useEffect } from 'react'
import { Col, Row, Form, Button, ArrayField } from '@douyinfe/semi-ui'
import { IconPlusCircle, IconMinusCircle } from '@douyinfe/semi-icons';
import API from '../services/api'

const StaticRouteConf = ({ initConfig, connection_id, preSaveInfConfig }) => {
  const [currentConf, setCurrentConf] = useState({ staticRoute: initConfig })
  const formRef = createRef()

  useEffect(() => {
    console.log('initStaticConfig', initConfig);
    setCurrentConf({ staticRoute: initConfig })
    formRef.current.formApi.setValue('staticRoute', initConfig)
  }, [initConfig])

  const onClickSendConfig = async event => {
    preSaveInfConfig('staticRoute', currentConf.staticRoute)
    const idx = event.currentTarget.dataset.idx
    console.log(idx);

    const staticRouteConfig = currentConf.staticRoute[idx]
    console.log(staticRouteConfig);

    await API.configStaticRoute({
      connection_id,
      ...staticRouteConfig
    })
  }

  return (
    <div>
      <Form
        allowEmpty
        ref={formRef}
        style={{ width: 500 }}
        onChange={formValue => {
          console.log('formChange', formValue.values);
          setCurrentConf(formValue.values)
        }}
      >
        <ArrayField field='staticRoute'>
          {({ add, arrayFields }) => (
            <React.Fragment>
              <Button onClick={add} icon={<IconPlusCircle />} theme='light'>新增配置</Button>
              {
                arrayFields.map(({ field, key, remove }, idx) => (
                  <div key={key} style={{ width: 1000, display: 'flex' }}>
                    <Form.Input
                      noLabel
                      placeholder='网段'
                      field={`${field}[ip_addr]`}
                      style={{ width: 200, marginRight: 16 }}
                    >
                    </Form.Input>
                    <Form.Input
                      noLabel
                      placeholder='掩码'
                      field={`${field}[netMask]`}
                      style={{ width: 200, marginRight: 16 }}
                    >
                    </Form.Input>
                    <Form.Input
                    noLabel
                    placeholder='端口号(s0/0/0)'
                      field={`${field}[interfaceNum]`}
                      style={{ width: 200, marginRight: 16 }}
                    >
                    </Form.Input>
                    <Button type='danger' theme='borderless' icon={<IconMinusCircle />} onClick={remove} style={{ margin: 12 }}></Button>
                    <Button data-idx={idx} onClick={onClickSendConfig} style={{ margin: 12 }} >配置并保存</Button>
                  </div>
                ))
              }
            </React.Fragment>
          )}
        </ArrayField>
      </Form>
    </div>
  )

}

export default StaticRouteConf