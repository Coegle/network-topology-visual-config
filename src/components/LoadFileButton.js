import React, { useRef, useState } from 'react'
import { Button, Modal, Spin, Typography } from '@douyinfe/semi-ui'
import blankConfigFile from '../data/blankConfig.json'
import configs from '../utils/configs'
import api from '../services/api'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const LoadFileButton = ({ file, setFile, hasNew, showFileName, buttonLabel }) => {
  const { Text } = Typography
  const inputRef = useRef()
  const history = useHistory()
  const [buttonState, setButtonState] = useState(true)

  const connectRouters = async ({ name, content }) => {
    let errorRouters = []
    setButtonState(false)
    for (const [idx, router] of content.routersConfig.entries()) {
      try {
        const { connection_id } = await api.connectRouter({ routerId: idx })
        if (connection_id === -1) {
          errorRouters = errorRouters.concat(router.routerName)
          break
        }
        content.routersConfig[idx].connection_id = connection_id
      } catch (excep) {
        errorRouters = errorRouters.concat(router.routerName)
      }
    }
    console.log(errorRouters);
    if (configs.fakeBackend) {
      // console.log(content);
      content.routersConfig = content.routersConfig.map((it, idx) => { return { ...it, connection_id: idx } })
      // console.log(content);
      setFile({ name, content: content })
      history.push('/topology')
    }
    else if (errorRouters.length !== 0) { // 出错了
      const titleText = errorRouters.join(', ').concat('连接失败')
      Modal.error({
        title: titleText,
        okText: '确定',
        onOk: () => {
          setButtonState(true)
        }
      }
      )
    }
    else {
      setFile({ name, content })
      history.push('/topology')
    }
    setButtonState(true)
  }

  const loadConfigFile = event => {
    console.log('File: Changed')
    const newFile = event.target.files[0]
    if (newFile != null) {
      const reader = new FileReader()
      reader.onload = async event => {
        const config = JSON.parse(event.target.result)
        connectRouters({ name: newFile.name, content: config })
        // console.log('File: Loaded')
      }
      reader.readAsText(newFile)
      // console.log('File: Loading')
    }
    else {
      setFile(null)
      // console.log('File: setToNull')
    }
    event.target.value = null
  }

  return (
    <div
      style={{ display: 'inline-block', height: '30px', margin: '12px 0 12px 0' }}
    >
      {
        showFileName && file !== null
          ? <Text>{file.name}</Text>
          : null
      }
      {
        buttonState
          ? <Button
            onClick={() => { inputRef.current.click() }}
            style={{ margin: "0 12px 0 12px" }}
            type="primary">
            {buttonLabel}
          </Button>
          : <Spin />
      }

      {
        hasNew && buttonState
          ? <Button
            onClick={() => { connectRouters({ name: 'Untitled', content: blankConfigFile }) }}
            style={{ padding: '6px 24px', marginRight: 12 }}
            type="primary">
            创建新拓扑文件
          </Button>
          : null
      }
      <input
        ref={inputRef}
        type="file"
        style={{ display: 'none' }}
        onChange={loadConfigFile} />
    </div>
  )
}
export default LoadFileButton