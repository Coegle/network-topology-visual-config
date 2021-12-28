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
    let allSuccess = 1
    for (const [idx, command] of testScriptContent.entries()) {
      const connection_id = configFile.content.routersConfig[command.routerIdx].connection_id
      try {
        if (command.type === 'ping') {
          const { success, echo } = await api.testPing({
            connection_id,
            ip_addr: command.command
          })
          if (!success) {
            Toast.error(`用例 ${idx} 未通过！`)
            allSuccess = 0
            break
          }
          testDetailRef.current.value = testDetailRef.current.value.concat(echo)
        }
        else {
          const { echo } = await api.sendCommand({
            connection_id, command: command.command
          })
          testDetailRef.current.value = testDetailRef.current.value.concat(echo)
        }
      } catch (excep) {
        Toast.error(`用例 ${idx} 未通过！`)
        allSuccess = 0
        break
      }
    }

    if (allSuccess) { // 出错了
      Toast.success('测试通过！')
    }
  }
  return (
    <>
      <LoadTestFileButton file={testFile} setFile={setTestFile} testAllScripts={testAllScripts} />
      <Title heading={4} style={{ margin: "10px 0 10px 0" }}>测试结果</Title>
      <TextArea ref={testDetailRef} readonly showClear rows={7} />
    </>
  )
}
export default TestUnit