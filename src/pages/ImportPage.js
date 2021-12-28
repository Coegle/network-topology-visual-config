import { IllustrationNoContent } from '@douyinfe/semi-illustrations';
import { Empty } from '@douyinfe/semi-ui'

import React from 'react'
import LoadFileButton from '../components/LoadFileButton';

const ImportPage = ({ setFile, file }) => {
  return (
    <Empty
      image={<IllustrationNoContent style={{ width: 150, height: 150 }} />}
      title={file !== null ? file.name : '请选择拓扑'}
    >
      <LoadFileButton file={file} setFile={setFile} hasNew={true} showFileName={false} buttonLabel={'打开拓扑文件'} />
    </Empty>
  )
}
export default ImportPage