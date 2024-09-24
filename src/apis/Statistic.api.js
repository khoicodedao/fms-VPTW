import axiosAsync from "../helpers/Axios";
import ALL_API from "../constants/All.api";
const getStatisticMiAV = async (body) => {
  let url = ALL_API.STATISTIC_MIAV_NEWVERSION;
  let data = await axiosAsync(url, body, "POST");
  return data?.status == 200 ? data.data : "Error";
};

const staticsExportDevice = async (body) => {
  let url = ALL_API.STATISTIC_EXPORT_DEVICE;
  let data = await axiosAsync(url, body, "POST");
  return data?.status == 200 ? data.data : "Error";
};

const staticsExportComputer = async (body) => {
  let url = ALL_API.STATISTIC_EXPORT_COMPUTER;
  let data = await axiosAsync(url, body, "POST");
  return data?.status == 200 ? data.data : "Error";
};
const staticsExportMiAV = async (body) => {
  let url = ALL_API.STATISTIC_EXPORT_MIAV;
  let data = await axiosAsync(url, body, "POST");
  return data?.status == 200 ? data.data : "Error";
};
const staticsExportIdent = async (body) => {
  let url = ALL_API.STATISTIC_EXPORT_IDENT;
  let data = await axiosAsync(url, body, "POST");
  return data?.status == 200 ? data.data : "Error";
};
const staticsExportMiAVActive = async (body) => {
  let url = ALL_API.STATISTIC_EXPORT_MIAV_ACTIVE;
  let data = await axiosAsync(url, body, "POST");
  return data?.status == 200 ? data.data : "Error";
};

const staticsExportIPByUnit = async (body) => {
  let url = ALL_API.STATISTIC_IP_BY_UNIT;
  let data = await axiosAsync(url, body, "POST");
  return data?.status == 200 ? data.data : "Error";
};
const staticsExportDomainByUnit = async (body) => {
  let url = ALL_API.STATISTIC_DOMAIN_BY_UNIT;
  let data = await axiosAsync(url, body, "POST");
  return data?.status == 200 ? data.data : "Error";
};

const staticsMalwareLv2ByUnit = async (body) => {
  let url = ALL_API.STATISTIC_MALWARE_LV2_BY_UNIT;
  let data = await axiosAsync(url, body, "POST");
  return data?.status == 200 ? data.data : "Error";
};
const staticsMalwareLv3ByUnit = async (body) => {
  let url = ALL_API.STATISTIC_MALWARE_LV3_BY_UNIT;
  let data = await axiosAsync(url, body, "POST");
  return data?.status == 200 ? data.data : "Error";
};

export {
  getStatisticMiAV,
  staticsExportDevice,
  staticsExportComputer,
  staticsExportMiAV,
  staticsExportIdent,
  staticsExportMiAVActive,
  staticsExportIPByUnit,
  staticsExportDomainByUnit,
  staticsMalwareLv2ByUnit,
  staticsMalwareLv3ByUnit,
};
