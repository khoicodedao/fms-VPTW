const headerFilterDeviceType = [
  {
    text: "Máy Tính",
    value: ["type_device", "=", "Máy Tính"],
  },
  {
    text: "Máy Chủ",
    value: ["type_device", "=", "Máy Chủ"],
  },
  {
    text: "Máy In/Photo",
    value: ["type_device", "=", "Máy In/Photo"],
  },
  {
    text: "Thiết bị mạng",
    value: ["type_device", "=", "Thiết bị mạng"],
  },
  {
    text: "Chưa xác định",
    value: ["type_device", "=", "Chưa xác định"],
  },
];
const headerFilterIdentify = [
  {
    text: "Đã định danh",
    value: ["status_ident", "=", "Đã định danh"],
  },
  {
    text: "Chưa định danh",
    value: ["status_ident", "=", "Chưa định danh"],
  },
];
const headerFilterMiAVStatus = [
  {
    text: "Không hỗ trợ",
    value: ["status_install_miav", "=", "Không hỗ trợ"],
  },
  {
    text: "Chưa xác định",
    value: ["status_install_miav", "=", "Chưa xác định"],
  },
  {
    text: "Đang hoạt động",
    value: ["status_install_miav", "=", "Đang hoạt động"],
  },
  {
    text: "Mất kết nối",
    value: ["status_install_miav", "=", "Mất kết nối"],
  },
  {
    text: "Chưa cài đặt",
    value: ["status_install_miav", "=", "Chưa cài đặt"],
  },
];
const columns = [
  { header: "MAC", key: "mac" },
  { header: "IP", key: "ip" },
  { header: "Tên thiết bị", key: "device_name" },
  {
    header: "Tên người quản lý",
    key: "manager_name",
  },
  {
    header: "Loại thiết bị",
    key: "type_device",
  },
  {
    header: "Định danh",
    key: "status_ident",
  },
  {
    header: "Phiên bản MiAV",
    key: "miav_version",
  },
  {
    header: "Trạng thái MiAV",
    key: "status_install_miav",
  },

  {
    header: "Tên đơn vị",
    key: "unit_full_name",
  },
];
export {
  headerFilterDeviceType,
  headerFilterIdentify,
  headerFilterMiAVStatus,
  columns,
};
