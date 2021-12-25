import React, { useRef } from 'react'
import { Button, Modal, Typography } from '@douyinfe/semi-ui'
import blankConfigFile from '../data/blankConfig.json'
import configs from '../utils/configs'
import api from '../services/api'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const LoadFileButton = ({ file, setFile, hasNew, showFileName }) => {
  const { Text } = Typography
  const inputRef = useRef()
  const history = useHistory()

  const connectRouters = async ({ name, content }) => {
    let errorRouters = []
    for (const [idx, router] of content.entries()) {
      try {
        const { connection_id } = await api.connectRouter({ routerId: idx })
        content[idx].connection_id = connection_id
      } catch (excep) {
        errorRouters = errorRouters.concat(router.routerName)
      }
    }

    if (configs.fakeBackend) {
      console.log(content);
      const fakedContent = content.map((it, idx) => { return { ...it, connection_id: idx } })
      console.log(fakedContent);
      setFile({ name, content: fakedContent })
      history.push('/topology')
    }
    else if (errorRouters.length !== 0) { // 出错了
      const titleText = errorRouters.join(', ').concat('连接失败')
      Modal.error({
        title: titleText,
        content: '重新尝试？',
        okText: '重连',
        cancelText: '取消',
        onOk: connectRouters,
        onCancel: () => {
          setFile(null)
        }
      })
    }
    else {
      setFile({ name, content })
      history.push('/topology')
    }
  }

  const loadConfigFile = event => {
    console.log('File: Changed')
    const newFile = event.target.files[0]
    if (newFile != null) {
      const reader = new FileReader()
      reader.onload = async event => {
        const config = JSON.parse(event.target.result)
        connectRouters({ name: newFile.name, content: config })
        console.log('File: Loaded')
      }
      reader.readAsText(newFile)
      console.log('File: Loading')
    }
    else {
      setFile(null)
      console.log('File: setToNull')
    }
  }

  return (
    <div>
      {
        showFileName && file !== null
          ? <Text>{file.name}</Text>
          : null
      }
      <Button
        onClick={() => { inputRef.current.click() }}
        style={{ padding: '6px 24px', marginRight: 12 }}
        type="primary">
        加载拓扑文件
      </Button>
      {
        hasNew
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
        onInput={loadConfigFile} />
    </div>
  )
}
export default LoadFileButton