const deviceTypes = [
  { ID: "Máy Tính", Name: "Máy Tính" },
  { ID: "Máy Chủ", Name: "Máy Chủ" },
  { ID: "Máy In/Photo", Name: "Máy In/Photo" },
  { ID: "Thiết bị mạng", Name: "Thiết bị mạng" },
  { ID: "Khác", Name: "Khác" },
];
const deviceLevel = [
  { ID: "Chưa xác định", Name: "Chưa xác định" },
  { ID: "Cấp 1", Name: "Cấp 1" },
  { ID: "Cấp 2", Name: "Cấp 2" },
  { ID: "Cấp 3", Name: "Cấp 3" },
  { ID: "Cấp 4", Name: "Cấp 4" },
  { ID: "Cấp 5", Name: "Cấp 5" },
];
const headerFilterDeviceLevel = [
  {
    text: "Chưa xác định",
    value: ["group", "=", "Chưa xác định"],
  },
  {
    text: "Cấp 1",
    value: ["group", "=", "Cấp 1"],
  },
  {
    text: "Cấp 2",
    value: ["group", "=", "Cấp 2"],
  },
  {
    text: "Cấp 3",
    value: ["group", "=", "Cấp 3"],
  },
  {
    text: "Cấp 4",
    value: ["group", "=", "Cấp 4"],
  },
  {
    text: "Cấp 5",
    value: ["group", "=", "Cấp 5"],
  },
];
const headerFilterDeviceTypes = [
  {
    text: "Máy Tính",
    value: ["type", "=", "Máy Tính"],
  },
  {
    text: "Máy Chủ",
    value: ["type", "=", "Máy Chủ"],
  },
  {
    text: "Máy In/Photo",
    value: ["type", "=", "Máy In/Photo"],
  },
  {
    text: "Thiết bị mạng",
    value: ["type", "=", "Thiết bị mạng"],
  },
  {
    text: "Khác",
    value: ["type", "=", "Khác"],
  },
];
const headerFilterNetWorkTypes = [
  {
    text: "TSLqs",
    value: ["network_type", "=", "TSLqs"],
  },
  {
    text: "Internet",
    value: ["network_type", "=", "Internet"],
  },
  {
    text: "Không kết nối mạng",
    value: ["network_type", "=", "Không kết nối mạng"],
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
    header: "Phân cấp chất lượng",
    key: "group",
  },
  {
    header: "Loại thiết bị",
    key: "type",
  },
  {
    header: "Loại mạng",
    key: "network_type",
  },

  {
    header: "Ngày khởi tạo",
    key: "created_at",
  },
  {
    header: "Tên đơn vị",
    key: "unit_full_name",
  },
  {
    header: "Loại thiết bị",
    key: "type",
  },
];
export {
  deviceTypes,
  deviceLevel,
  headerFilterDeviceLevel,
  headerFilterDeviceTypes,
  headerFilterNetWorkTypes,
  columns,
};
