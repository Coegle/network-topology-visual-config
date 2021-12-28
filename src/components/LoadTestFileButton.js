import React, { useRef } from 'react'
import { Button, Typography } from '@douyinfe/semi-ui'

const LoadTestFileButton = ({ file, setFile, testAllScripts}) => {
  const { Text } = Typography
  const inputRef = useRef()

  const loadTestFile = event => {
    console.log('File: Changed')
    const newFile = event.target.files[0]
    if (newFile != null) {
      const reader = new FileReader()
      reader.onload = async event => {
        const config = JSON.parse(event.target.result)
        testAllScripts({ testScriptContent: config })
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
    <>
      {
        file !== null
          ? <Text>{file.name}</Text>
          : null
      }
      <Button
        onClick={() => { inputRef.current.click() }}
        style={{ padding: '6px 24px', marginRight: 12 }}
        type="primary">
        加载测试文件
      </Button>
      <input
        ref={inputRef}
        type="file"
        style={{ display: 'none' }}
        onChange={loadTestFile} />
    </>
  )
}
export default LoadTestFileButton