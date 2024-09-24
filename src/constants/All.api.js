const apiUrl = (endpoint) => {
  const baseUrl = process.env.REACT_APP_API_SERVER || "";
  return baseUrl ? `${baseUrl}${endpoint}` : endpoint;
};
const ALL_API = {
  // ================LOGIN==================
  LOGIN: apiUrl("/api/v1/auth/login"),
  // ================Home==================
  HOME_CARD: apiUrl("/api/v1/dashboard/statis"),
  HOME_CandC: apiUrl("/api/v1/dashboard/statisticalCandC"),
  HOME_MALWARE: apiUrl("/api/v1/dashboard/statisticalMalware"),
  HOME_VIOLENT: apiUrl("/api/v1/dashboard/statisticalViolent"),
  // ================Software==================
  SOFTWARE_LIST_PAGING: apiUrl("/api/v1/softwares/paginate"),
  SOFTWARE_DETAIL_LOG_PAGING: apiUrl("/api/v1/log-fmsfmc/paginate"),
  // ================Activate License===========
  SOFTWARE_DECRYPT: apiUrl("/api/v1/softwares/decrypt-software"),
  SOFTWARE_CHECK_SETUP: apiUrl("/api/v1/softwares/check-setup"),
  // ================FMS==================
  FMS_LIST: apiUrl("/api/v1/fms/all"),
  FMS_ADD: apiUrl("/api/v1/fms/add"),
  FMS_EDIT: apiUrl("/api/v1/fms/edit"),
  FMS_DELETE: apiUrl("/api/v1/fms/delete"),
  FMS_GEN_KEY: apiUrl("/api/v1/fms/genKeyFMS"),
  // ================FMC==================
  FMC_LIST: apiUrl("/api/v1/fmc/all"),
  FMC_ADD: apiUrl("/api/v1/fmc/add"),
  FMC_EDIT: apiUrl("/api/v1/fmc/edit"),
  FMC_DELETE: apiUrl("/api/v1/fmc/delete"),
  FMC_GEN_KEY: apiUrl("/api/v1/fmc/genKeyFMC"),
  // ================Unit==================
  UNIT_LIST: apiUrl("/api/v1/units/all"),
  UNIT_ADD: apiUrl("/api/v1/units/add"),
  UNIT_EDIT: apiUrl("/api/v1/units/edit"),
  UNIT_DELETE: apiUrl("/api/v1/units/delete"),
  UNIT_ALL_CHILD: apiUrl("/api/v1/units/all-child"),
  // ================Internet==================
  INTERNET_LIST: apiUrl("/api/v1/alert/internet"),
  // ================Alert ==================
  AlERT_LIST: apiUrl("/api/v1/alerts/all"),
  ALERT_LIST_PAGING: apiUrl("/api/v1/alerts/paginate"),
  ALERT_LIST_SEARCH: apiUrl("/api/v1/alerts/search"),
  ALERT_LIST_BY_MAC: apiUrl("/api/v1/alerts/bymac"),
  // ================Event ==================
  EVENT_LIST: apiUrl("/api/v1/events/all"),
  EVENT_LIST_PAGING: apiUrl("/api/v1/events/paginate"),
  EVENT_LIST_SEARCH: apiUrl("/api/v1/events/search"),
  // ================Device ==================
  DEVICE_LIST_PAGING: apiUrl("/api/v1/active-devices/paginate"),
  DEVICE_LIST: apiUrl("/api/v1/active-devices/all"),
  DEVICE_ADD: apiUrl("/api/v1/active-devices/add"),
  DEVICE_EDIT: apiUrl("/api/v1/active-devices/edit"),
  DEVICE_DELETE: apiUrl("/api/v1/active-devices/delete"),
  // ================User ==================
  USER_ADD: apiUrl("/api/v1/users/add"),
  USER_LIST: apiUrl("/api/v1/users/all"),
  USER_EDIT: apiUrl("/api/v1/users/edit"),
  USER_DETAIL: apiUrl("/api/v1/users/detail"),
  USER_DELETE: apiUrl("/api/v1/users/delete"),
  // ================Identify ==================
  IDENTIFY_LIST_PAGING: apiUrl("/api/v1/ident-devices/paginate"),
  IDENTIFY_ADD: apiUrl("/api/v1/ident-devices/insert"),
  IDENTIFY_EDIT: apiUrl("/api/v1/ident-devices/edit"),
  IDENTIFY_DELETE: apiUrl("/api/v1/ident-devices/delete"),
  IDENTIFY_UPLOAD: apiUrl("/api/v1/ident-devices/import"),
  // ================Config ====================
  CONFIG_LIST: apiUrl("/api/v1/settings/detail?id=1"),
  CONFIG_EDIT: apiUrl("/api/v1/settings/edit"),
  // ================Detail ====================
  DETAIL_VIOLENT: apiUrl("/api/v1/detail-dashboard/violent"),
  DETAIL_MiAV: apiUrl("/api/v1/detail-dashboard/miav"),
  DETAIL_CANDC: apiUrl("/api/v1/detail-dashboard/candc"),
  DETAIL_MALWARE: apiUrl("/api/v1/detail-dashboard/malware"),
  // ================Statistic ====================
  STATISTIC_MIAV_NEWVERSION: apiUrl("/api/v1/statistical/miav_new_version"),
  STATISTIC_EXPORT_DEVICE: apiUrl("/api/v1/statistical/export_device"),
  STATISTIC_EXPORT_COMPUTER: apiUrl("/api/v1/statistical/export_computer"),
  STATISTIC_EXPORT_MIAV: apiUrl("/api/v1/statistical/export_miav"),
  STATISTIC_EXPORT_IDENT: apiUrl("/api/v1/statistical/export_ident"),
  STATISTIC_EXPORT_MIAV_ACTIVE: apiUrl(
    "/api/v1/statistical/export_miav_active"
  ),
  STATISTIC_IP_BY_UNIT: apiUrl("/api/v1/detail-dashboard/unit-ip"),
  STATISTIC_DOMAIN_BY_UNIT: apiUrl("/api/v1/detail-dashboard/unit-domain"),
  STATISTIC_MALWARE_LV2_BY_UNIT: apiUrl(
    "/api/v1/detail-dashboard/unit-malware-lv2"
  ),
  STATISTIC_MALWARE_LV3_BY_UNIT: apiUrl(
    "/api/v1/detail-dashboard/unit-malware-lv3"
  ),
};

export default ALL_API;
