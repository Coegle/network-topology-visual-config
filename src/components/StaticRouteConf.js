import React, { createRef, useState, useEffect } from 'react'
import { Form, Button, ArrayField, Toast } from '@douyinfe/semi-ui'
import { IconPlusCircle, IconMinusCircle, IconSave } from '@douyinfe/semi-icons';
import API from '../services/api'

const StaticRouteConf = ({ initConfig, connection_id, preSaveInfConfig }) => {
  const [currentConf, setCurrentConf] = useState({ staticRoute: initConfig })
  const formRef = createRef()

  useEffect(() => {
    // console.log('initStaticConfig', initConfig)
    setCurrentConf({ staticRoute: initConfig })
    formRef.current.formApi.setValue('staticRoute', initConfig)
  }, [initConfig])

  const onClickSendConfig = async event => {
    const idx = event.currentTarget.dataset.idx
    // console.log(idx);

    const staticRouteConfig = currentConf.staticRoute[idx]
    // console.log(staticRouteConfig);
    try {
      await API.configStaticRoute({
        connection_id,
        ...staticRouteConfig
      })
      Toast.success('静态路由配置成功！')
    }
    catch {
      Toast.error('静态路由配置失败！')
    }
  }

  return (
    <div>
      <Form
        allowEmpty
        ref={formRef}
        style={{ width: 500 }}
        onChange={formValue => {
          // console.log('formChange', formValue.values);
          setCurrentConf(formValue.values)
        }}
      >
        <ArrayField field='staticRoute'>
          {({ add, arrayFields }) => (
            <React.Fragment>
              <Button onClick={add} icon={<IconPlusCircle />} theme='light'>新增配置</Button>
              <Button onClick={() => { preSaveInfConfig('staticRoute', currentConf.staticRoute) }}
                icon={<IconSave />}
                style={{ marginLeft: '8px' }}
                theme='light'>保存</Button>
              {
                arrayFields.map(({ field, key, remove }, idx) => (
                  <div key={key} style={{ width: 1000, display: 'flex' }}>
                    <Form.Input
                      noLabel
                      placeholder='网段'
                      field={`${field}[ip_addr]`}
                      style={{ width: 150, marginRight: 16 }}
                    >
                    </Form.Input>
                    <Form.Input
                      noLabel
                      placeholder='掩码'
                      field={`${field}[netMask]`}
                      style={{ width: 150, marginRight: 16 }}
                    >
                    </Form.Input>
                    <Form.Input
                      noLabel
                      placeholder='端口号(s0/0/0)'
                      field={`${field}[interfaceNum]`}
                      style={{ width: 120, marginRight: 16 }}
                    >
                    </Form.Input>
                    <Button type='danger' theme='borderless' icon={<IconMinusCircle />} onClick={remove} style={{ margin: 12 }}></Button>
                    <Button data-idx={idx} onClick={onClickSendConfig} style={{ margin: 12 }} >配置</Button>
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