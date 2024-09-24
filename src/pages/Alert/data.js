const headerFilterDataAlert = [
  {
    text: "Thấp",
    value: [["alert_level_id", "=", "0"], "or", ["alert_level_id", "=", "1"]],
  },
  // {
  //   text: 'Trung Bình',
  //   value: ['alert_level_id', '=', '1'],
  // },
  {
    text: "Trung Bình ",
    value: ["alert_level_id", "=", "2"],
  },
  {
    text: "Cao",
    value: ["alert_level_id", "=", "3"],
  },
];
const columns = [
  { header: "MAC", key: "mac" },
  { header: "IP", key: "ip" },
  {
    header: "Nguồn",
    key: "source_name",
  },
  { header: "Thời gian", key: "event_time" },
  {
    header: "Tên người quản lý",
    key: "manager_name",
  },
  {
    header: "Mức cảnh báo",
    key: "alert_level_id",
  },
  {
    header: "Loại cảnh báo",
    key: "alert_type",
  },
  {
    header: "Mô tả",
    key: "alert_info.description",
  },
  {
    header: "Tên đơn vị",
    key: "unit_full_name",
  },
];
export { headerFilterDataAlert, columns };
