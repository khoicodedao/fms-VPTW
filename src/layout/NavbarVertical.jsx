import { NavLink } from 'react-router-dom'
import { useState } from 'react'

const Navbar = (props) => {
  const { changeUI } = props
  const [isCollapsed, setIsCollapsed] = useState(true)

  const toggleCollapse = () => {
    console.log(changeUI)
    setIsCollapsed(!isCollapsed)
    changeUI(!isCollapsed)
  }

  return (
    <nav
      className={`navbar-primary ${isCollapsed ? 'collapsed' : ''}`}
      style={{ top: '66px' }}
    >
      <div
        id="btn-collapse"
        onClick={toggleCollapse}
        className="btn-expand-collapse"
      >
        <span
          id="btn-right"
          className={`ion-arrow-${isCollapsed ? 'right' : 'left'}-b`}
        />
      </div>

      <ul className="navbar-primary-menu">
        <li>
          <NavLink name="Tổng quan" to="/">
            <span className="ion-home" style={{ fontSize: '20px' }} />
            <span className="nav-label pl-2">Tổng quan</span>
          </NavLink>
        </li>

        <li>
          <NavLink name="Cảnh báo" to="/alert">
            <span className="ion-alert-circled" style={{ fontSize: '20px' }} />
            <span className="nav-label pl-2">Cảnh báo</span>
          </NavLink>
        </li>

        <li>
          <NavLink name="Sự kiện" to="/event">
            <span className="ion-calendar" style={{ fontSize: '20px' }} />
            <span className="nav-label pl-2">Sự kiện</span>
          </NavLink>
        </li>

        <li>
          <NavLink name="Thiết bị" to="/device">
            <span className="ion-monitor" style={{ fontSize: '20px' }} />
            <span className="nav-label pl-2">Thiết bị</span>
          </NavLink>
        </li>

        <li>
          <NavLink name="Định danh" to="/identify">
            <span className="ion-person-stalker" style={{ fontSize: '20px' }} />
            <span className="nav-label pl-2">Định danh</span>
          </NavLink>
        </li>

        <li>
          <NavLink name="Quản lý FMS/FMC" to="/software">
            <span className="ion-laptop" style={{ fontSize: '20px' }} />
            <span className="nav-label pl-2">Quản lý FMS/FMC</span>
          </NavLink>
        </li>

        <li>
          <NavLink name="Cấu hình" to="/config">
            <span className="ion-ios-gear" style={{ fontSize: '20px' }} />
            <span className="nav-label pl-2">Cấu hình</span>
          </NavLink>
        </li>

        <li>
          <NavLink name="Thống kê" to="/statistics">
            <span className="ion-stats-bars" style={{ fontSize: '20px' }} />
            <span className="nav-label pl-2">Thống kê</span>
          </NavLink>
        </li>

        <li>
          <NavLink name="Hỗ trợ" to="/support">
            <span className="ion-ios-telephone" style={{ fontSize: '20px' }} />
            <span className="nav-label pl-2">Hỗ trợ</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
