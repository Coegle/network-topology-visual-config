import React, { createRef, useState, useEffect } from 'react'
import { Form, Button, ArrayField, Toast } from '@douyinfe/semi-ui'
import { IconPlusCircle, IconMinusCircle, IconSave } from '@douyinfe/semi-icons';
import API from '../services/api'

const OSPFConfig = ({ initConfig, connection_id, preSaveInfConfig }) => {
  const [currentConf, setCurrentConf] = useState({ OSPFConfig: initConfig })
  const formRef = createRef()

  useEffect(() => {
    // console.log('initStaticConfig', initConfig);
    setCurrentConf({ OSPFConfig: initConfig })
    formRef.current.formApi.setValue('OSPFConfig', initConfig)
  }, [initConfig])

  const onClickSendConfig = async event => {
    const idx = event.currentTarget.dataset.idx
    // console.log(idx);

    const OSPFConfig = currentConf.OSPFConfig[idx]
    // console.log(OSPFConfig);
    try {

    
    await API.configOSPFArea({
      connection_id,
      ...OSPFConfig
    })
    Toast.success(`OSPF配置成功！`)
  }
  catch (excep) {
    Toast.error(`OSPF配置失败！`)
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
        <ArrayField field='OSPFConfig'>
          {({ add, arrayFields }) => (
            <React.Fragment>
              <Button onClick={add} icon={<IconPlusCircle />} theme='light'>新增配置</Button>
              <Button
                onClick={() => { preSaveInfConfig('OSPFConfig', currentConf.OSPFConfig) }}
                icon={<IconSave />}
                style={{ marginLeft: '8px' }}
                theme='light'>保存</Button>
              {
                arrayFields.map(({ field, key, remove }, idx) => (
                  <div key={key} style={{ width: 1000, display: 'flex' }}>
                    <Form.Input
                      noLabel
                      prefix='进程ID'
                      field={`${field}[ospf_id]`}
                      style={{ width: 90, marginRight: 16 }}
                    >
                    </Form.Input>
                    <Form.Input
                      noLabel
                      prefix='区域ID'
                      field={`${field}[area_id]`}
                      style={{ width: 90, marginRight: 16 }}
                    >
                    </Form.Input>
                    <Form.Input
                      noLabel
                      prefix='网段'
                      field={`${field}[ip_addr]`}
                      style={{ width: 170, marginRight: 16 }}
                    >
                    </Form.Input>
                    <Form.Input
                      noLabel
                      prefix='掩码反码'
                      field={`${field}[netMask]`}
                      style={{ width: 198, marginRight: 16 }}
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
    </div >
  )

}

export default OSPFConfig