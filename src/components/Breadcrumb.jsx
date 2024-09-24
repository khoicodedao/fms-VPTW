import { Breadcrumb } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import { HomeOutlined } from '@ant-design/icons'
export default function Bread() {
  const location = useLocation()
  const pathSnippets = location.pathname.split('/').filter((i) => i)
  const breadcrumbNameMap = {
    '/': 'Trang chủ',
    '/software': 'Quản lý FMS-FMC',
    '/event': 'Sự kiện',
    '/internet': 'Máy vi phạm quy định',
    '/unit': 'Đơn vị',
    '/alert': 'Cảnh báo',
    '/user': 'Tài khoản',
    '/device': 'Thiết bị',
    '/device_unknown': 'Thiết bị chưa quản lý',
    '/identify': 'Định danh thiết bị',
    '/support': 'Hỗ trợ',
    '/config': 'Cấu hình hệ thống',
    '/statistics': 'Thống kê số liệu',
    '/detail-violent': 'Vi phạm quy định',
    '/detail-miav': 'MiAV',
    '/detail-malware': 'Mã độc',
    '/detail-candc': 'Kết nối tên miền độc hại',
  }
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    )
  })
  const breadcrumbItems = [
    <Breadcrumb.Item key="Trang chủ">
      <HomeOutlined /> <Link to="/">Trang chủ</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems)
  return (
    <div>
      <Breadcrumb>{breadcrumbItems}</Breadcrumb>
    </div>
  )
}
