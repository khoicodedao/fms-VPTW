import { Button as ButtonAnt, message, Upload } from 'antd'
import ALL_API from '../../constants/All.api'

export default function UploadFile() {
  const props = {
    name: 'file',
    action: ALL_API.IDENTIFY_UPLOAD,
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file tải lên thành công!`)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file tải lên thất bại!`)
      }
    },
  }
  return (
    <Upload listType="picture-card" {...props}>
      <span>Tải file lên</span>
    </Upload>
  )
}
