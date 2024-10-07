import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useSelector, useDispatch } from "react-redux";

export default function DateTimePicker() {
  const dateGlobal = useSelector((state) => state.changeDateReducer); //dateTime from Reducer combine on index.js
  const dispatch = useDispatch(); //function dispatch to change state global
  const { RangePicker } = DatePicker;
  const dateTimeFormat = "YYYY-MM-DD hh:mm:ss";
  const onChange = (value, dateString) => {
    dispatch({
      type: "CHANGE_DATE",
      payload: { startDate: dateString[0], endDate: dateString[1] },
    });
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
      }}
    >
      <div style={{ width: "91%" }}>
        <RangePicker
          onChange={onChange} //function get time when click OK to RangePicker
          defaultValue={[
            dayjs(dateGlobal.startDate, dateTimeFormat),
            dayjs(dateGlobal.endDate, dateTimeFormat),
          ]}
          showTime
        />
      </div>
    </div>
  );
}
