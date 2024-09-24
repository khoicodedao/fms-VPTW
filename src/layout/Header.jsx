import { toggleFullScreen } from '../helpers/ViewFunction'

const Header = () => {
  return (
    <nav
      className="navbar header-navbar pcoded-header"
      header-theme="theme6"
      pcoded-header-position="fixed"
    >
      <div className="navbar-wrapper">
        <div className="navbar-logo" logo-theme="theme1">
          <a
            className="mobile-menu"
            id="mobile-collapse"
            href="#!"
            style={{ paddingTop: '10px' }}
          >
            <i className="feather icon-menu icon-toggle-right" />
          </a>
          <a href="index-1.htm" style={{ fontSize: '20px' }}>
            FMS
          </a>
          <a className="mobile-options">
            <i className="feather icon-more-horizontal" />
          </a>
        </div>
        <div className="navbar-container container-fluid">
          <ul className="nav-left">
            <li className="header-search">
              <div className="main-search morphsearch-search">
                <div className="input-group">
                  <span className="input-group-addon search-close">
                    <i className="feather icon-x" />
                  </span>
                  <input type="text" className="form-control" />
                  <span className="input-group-addon search-btn">
                    <i className="feather icon-search" />
                  </span>
                </div>
              </div>
            </li>
            <li>
              <a
                href="#!"
                onClick={() => {
                  toggleFullScreen()
                }}
              >
                <i className="feather icon-maximize full-screen" />
              </a>
            </li>
          </ul>
          <ul className="nav-right">
            <li className="user-profile header-notification">
              <div className="dropdown-primary dropdown">
                <div className="dropdown-toggle" data-toggle="dropdown">
                  <img
                    src="/assets/files/assets/images/user.png"
                    style={{ width: '20px' }}
                    className="img-radius"
                    alt="User-Profile-Image"
                  />
                  <span>John Doe</span>
                  <i className="feather icon-chevron-down" />
                </div>
                <ul
                  className="show-notification profile-notification dropdown-menu"
                  data-dropdown-in="fadeIn"
                  data-dropdown-out="fadeOut"
                >
                  <li>
                    <a href="#!">
                      <i className="feather icon-settings" /> Settings
                    </a>
                  </li>
                  <li>
                    <a href="user-profile.htm">
                      <i className="feather icon-user" /> Profile
                    </a>
                  </li>
                  <li>
                    <a href="email-inbox.htm">
                      <i className="feather icon-mail" /> My Messages
                    </a>
                  </li>
                  <li>
                    <a href="auth-lock-screen.htm">
                      <i className="feather icon-lock" /> Lock Screen
                    </a>
                  </li>
                  <li>
                    <a href="auth-normal-sign-in.htm">
                      <i className="feather icon-log-out" /> Logout
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header
