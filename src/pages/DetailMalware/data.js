const columns = [
  { header: "MAC", key: "mac" },
  { header: "IP", key: "ip" },
  { header: "Địa chỉ public", key: "public_ip" },
  {
    header: "Loại cảnh báo",
    key: "alert_type",
  },
  {
    header: "Nguồn cảnh báo",
    key: "alert_source",
  },
  {
    header: "Mức cảnh báo",
    key: "alert_level_id",
  },
  {
    header: "Tên người quản lý",
    key: "manager_name",
  },
  {
    header: "Thời gian",
    key: "event_time",
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
export { columns };
