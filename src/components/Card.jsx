import { Item } from "devextreme-react/accordion";
import { NavLink } from "react-router-dom";
const Card = (props) => {
  let { data, name, color, link, total, icon } = props;

  return (
    // <div className={`card social-card bg-simple-c-${color}`}>
    //   <div className="card-block">
    //     <div className="row align-items-center">
    //       <div className="col">
    //         <h6
    //           style={{
    //             display: 'flex',
    //             alignItems: 'center',
    //             borderBottom: 'solid',
    //           }}
    //         >
    //           <i
    //             class={icon}
    //             style={{ fontSize: '3rem', marginRight: '15px' }}
    //           ></i>{' '}
    //           <b>{name}</b> :{' '}
    //           <strong className="f-26 ml-2">{total || 0}</strong>
    //         </h6>
    //         <div
    //           style={{
    //             display: 'flex',
    //             flexDirection: 'column',
    //             justifyContent: 'space-around',
    //             minHeight: '7rem',
    //           }}
    //         >
    //           {data.map((item) => (
    //             <div style={{ fontWeight: '400' }}>
    //               {item.name}:{'   '}
    //               <strong className="f-20 ml-2">{item.data ?? 0}</strong>
    //             </div>
    //           ))}
    //         </div>
    //         {/* <p>
    //           Số lượng thiết bị: <strong className="f-26">{data ?? 0}</strong>
    //         </p>
    //         <p>
    //           Số lượng đơn vị: <strong className="f-26">{data ?? 0}</strong>
    //         </p> */}
    //       </div>
    //     </div>
    //   </div>
    //   <NavLink className="download-icon" to={link ?? '/#'}>
    //     <i className="feather icon-arrow-down"></i>
    //   </NavLink>
    // </div>
    <div className="card">
      <div className="card-block">
        <div className="row align-items-center">
          <div className="col-8">
            <h4 className={`text-c-${color} f-w-600`}>{total || 0}</h4>
            <h6 className="text-muted m-b-0">{name}</h6>
          </div>
          <div className="col-4 text-right">
            <NavLink className="download-icon" to={link ?? "/#"}>
              <i className="feather icon-bar-chart f-28" />
            </NavLink>
          </div>
        </div>
      </div>
      <div className={`card-footer bg-c-${color}`}>
        <div className="row align-items-center">
          <div className="col-9">
            <div className="row align-items-center">
              <div className="col">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    minHeight: "7rem",
                  }}
                >
                  {data.map((item) => (
                    <div style={{ fontWeight: "400", color: "white" }}>
                      {item.name}:{"   "}
                      <strong className="f-20 ml-2">{item.data ?? 0}</strong>
                    </div>
                  ))}
                </div>
                {/* <p>
              Số lượng thiết bị: <strong className="f-26">{data ?? 0}</strong>
            </p>
            <p>
              Số lượng đơn vị: <strong className="f-26">{data ?? 0}</strong>
            </p> */}
              </div>
            </div>
          </div>
          <div className="col-3 text-right">
            <NavLink className="download-icon" to={link ?? "/#"}></NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
