import { TextArea, Toast, Typography } from '@douyinfe/semi-ui'
import React, { useRef, useState } from 'react'
import LoadTestFileButton from './LoadTestFileButton'
import api from '../services/api'
const { Title } = Typography

const TestUnit = ({ configFile }) => {
  const [testFile, setTestFile] = useState(null)
  const testDetailRef = useRef()
  useState(() => {

  }, [testFile])

  const testAllScripts = async ({ testScriptContent }) => {
    let errorInfo = []
    let details = []
    let allSuccess = 1
    for (const [idx, command] of testScriptContent.entries()) {
      try {
        const { success, detail } = await api.runTest({
          connection_id: configFile.content.routersConfig[command.routerIdx].connection_id,
          command: command.command
        })
        details = details.concat(detail)
        allSuccess = allSuccess && success
        if (!success) {
          errorInfo = errorInfo.concat(idx)
        }
      } catch (excep) {
        allSuccess = false
        errorInfo = errorInfo.concat(idx)
        break
      }
    }

    testDetailRef.current.value = details.join('\n')

    if (!allSuccess) { // 出错了
      Toast.error(`${errorInfo.join(', ')} 测试未通过！`)
    }
    else {
      Toast.success('测试通过！')
    }

  }
  return (
    <>
      <LoadTestFileButton file={testFile} setFile={setTestFile} testAllScripts={testAllScripts} />

      <br></br>
      <Title heading={4}>测试结果</Title>
      <TextArea ref={testDetailRef} style={{ marginTop: 10 }} readonly showClear />
    </>
  )
}
export default TestUnit