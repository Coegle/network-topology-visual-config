import { TextArea, Toast, Typography } from '@douyinfe/semi-ui'
import React, { useState } from 'react'
import LoadTestFileButton from './LoadTestFileButton'
import api from '../services/api'
import './TextArea.css'
const { Title } = Typography

const TestUnit = ({ configFile }) => {
  const [testFile, setTestFile] = useState(null)
  const [allEcho, setAllEcho] = useState('请加载测试脚本')
  useState(() => {

  }, [testFile])

  const testAllScripts = async ({ testScriptContent }) => {
    setAllEcho('')
    let allSuccess = 1
    let currentEchos = []
    if (!Array.isArray(testScriptContent)) return
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
          currentEchos = currentEchos.concat(echo)
        }
        else if (command.type === 'testOSPF') {
          const { success, echo } = await api.testOSPF({
            connection_id,
            command: command.command,
            requiredState: command.requiredState
          })
          if (!success) {
            Toast.error(`用例 ${idx} 未通过！`)
            allSuccess = 0
            break
          }
          currentEchos = currentEchos.concat(echo)
        }
        else {
          const { echo } = await api.sendCommand({
            connection_id, command: command.command
          })
          currentEchos = currentEchos.concat(echo)
        }
      } catch (excep) {
        Toast.error(`用例 ${idx} 未通过！`)
        allSuccess = 0
        break
      }
    }
    setAllEcho(currentEchos.join('\r\n'))
    if (allSuccess) {
      Toast.success('测试通过！')
    }
  }
  return (
    <>
      <LoadTestFileButton file={testFile} setFile={setTestFile} testAllScripts={testAllScripts} />
      <Title heading={4} style={{ margin: "10px 0 10px 0" }}>测试结果</Title>
      <TextArea value={allEcho} readonly showClear rows={18} />
    </>
  )
}
export default TestUnit