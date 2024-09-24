import './css/style.css'
export default function NotFound() {
  return (
    <div>
      {/* Your logo on the top left */}

      <div className="content">
        <div className="content-box">
          <div className="big-content">
            {/* Main squares for the content logo in the background */}
            <div className="list-square">
              <span className="square" />
              <span className="square" />
              <span className="square" />
            </div>
            {/* Main lines for the content logo in the background */}
            <div className="list-line">
              <span className="line" />
              <span className="line" />
              <span className="line" />
              <span className="line" />
              <span className="line" />
              <span className="line" />
            </div>
            {/* The animated searching tool */}
            <i className="fa fa-search" aria-hidden="true" />
            {/* div clearing the float */}
            <div className="clear" />
          </div>
          {/* Your text */}
          <h1>Oops! Error 404 not found.</h1>
          <p>
            The page you were looking for doesn't exist.
            <br />
            We think the page may have moved.
          </p>
        </div>
      </div>
      <footer className="light">
        <ul>
          <li>
            <a href="#">Support</a>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-facebook" />
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-twitter" />
            </a>
          </li>
        </ul>
      </footer>
    </div>
  )
}
