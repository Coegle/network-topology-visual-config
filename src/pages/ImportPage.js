import { IllustrationNoContent } from '@douyinfe/semi-illustrations';
import { Empty } from '@douyinfe/semi-ui'

import React from 'react'
import LoadFileButton from '../components/LoadFileButton';

const ImportPage = ({ setFile, file }) => {
  return (
    <Empty
      style={{marginBottom: '20vh', height: '100vh', justifyContent: 'center' }}
      image={<IllustrationNoContent style={{ width: 200, height: 200 }} />}
      title={file !== null ? file.name : '请选择拓扑'}
    >
      <LoadFileButton file={file} setFile={setFile} hasNew={true} showFileName={false} buttonLabel={'打开拓扑文件'} />
    </Empty>
  )
}
export default ImportPage