import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer'
import React from 'react'

const SettingPage = () => {
  const 
    uri= 'http://localhost:8080/api/categories/course/v1/49e35a72-45d3-4b26-a10f-263ceb6f6273-huysor%20(2).pdf'

  return (
    <iframe  width="100%" height="100%" src={uri}></iframe>
  )
}

export default SettingPage