import Cards from "../../components/Card";
import { useEffect, useState } from "react";
import ArmChartPie from "../../components/ArmChartPie";
import CardWrapper from "../../components/CardWrapper";
import ArmChartColumn from "../../components/ArmChartColumn";
import * as am4core from "@amcharts/amcharts4/core";
import { Link } from "react-router-dom";
import { Spin } from "antd";
import {
  getCard,
  getViolent,
  getStatisticalMalware,
  getCandC,
} from "../../apis/Home.api";
import { useSelector } from "react-redux";
import Text from "../../helpers/Text";
export default function Home() {
  let unitGlobal = useSelector((state) => state.unitCodeReducer);
  let dateGlobal = useSelector((state) => state.changeDateReducer);
  const [isLoading, setIsLoading] = useState(true);
  const [card, setCard] = useState({});
  const [chartAlert, setChartAlert] = useState([]);
  const [chartMalware, setChartMalware] = useState([]);
  const [chartCandC, setChartCandC] = useState([]);
  // change background color css
  let loadData = async () => {
    setIsLoading(true);
    let body = {
      unit_code: unitGlobal,
      start_date: dateGlobal?.startDate,
      end_date: dateGlobal?.endDate,
    };
    let data = await getCard(body);
    setCard({ ...data.data });
    let dataChartAlert = await getViolent(body);
    setChartAlert([...dataChartAlert?.data]);
    let dataMalware = await getStatisticalMalware(body);
    setChartMalware([...dataMalware.data]);
    let dataCandC = await getCandC(body);
    setChartCandC([...dataCandC.data]);
    setIsLoading(false);
  };
  useEffect(() => {
    loadData();
  }, [unitGlobal, dateGlobal]);
  return (
    <Spin spinning={isLoading} size="large">
      <div page="home">
        {/* Start section card */}
        <section name="card">
          <div className="row">
            <div className="col-xl-4 col-md-6">
              <Cards
                color="pink"
                data={[
                  {
                    name: Text.CARD_POLICY[0],

                    data: card?.countDeviceConnectInternet ?? 0,
                  },
                  {
                    name: Text.CARD_POLICY[1],

                    data: card?.countdeviceConnectTSLqs ?? 0,
                  },
                  {
                    name: Text.CARD_POLICY[2],

                    data: card?.countdevicePlugInUSB ?? 0,
                  },
                  // {
                  //   name: (
                  //     <Link
                  //       style={{ color: "white", textDecoration: "underline" }}
                  //       to="/device?group_field=mac&filter=network_type,=,Không kết nối mạng"
                  //     >
                  //       {Text.CARD_POLICY[3]}
                  //     </Link>
                  //   ),

                  //   data: card?.countDeviceNotRegisterNetwork ?? 0,
                  // },
                ]}
                total={
                  card.countDeviceConnectInternet +
                  card.countdevicePlugInUSB +
                  card?.countdeviceConnectTSLqs +
                  card?.countDeviceNotRegisterNetwork
                }
                icon="ion-alert-circled"
                link={Text.CARD_URL_POLICY}
                name={Text.CARD_POLICY_NAME}
              />
            </div>
            <div className="col-xl-4 col-md-6">
              <Cards
                total={card?.countdeviceCandCIP + card?.countdeviceCandCDomain}
                link="/detail-candc"
                data={[
                  {
                    name: "IP độc hại",

                    data: card?.countdeviceCandCIP || 0,
                  },
                  {
                    name: "Tên miền độc hại",

                    data: card?.countdeviceCandCDomain || 0,
                  },
                  {
                    name: "Số lượng đơn vị",
                    data: card?.countUnitCandC || 0,
                  },
                ]}
                color="green"
                icon="ion-social-rss"
                name="Thiết bị kết nối máy chủ điều khiển"
              />
            </div>
            <div className="col-xl-4 col-md-6">
              <Cards
                data={[
                  {
                    name: "Mã độc mức cao",
                    data: card?.countdeviceMalwareLV2 || 0,
                  },
                  {
                    name: "Mã độc mức trung bình",
                    data: card?.countdeviceMalwareLV1 || 0,
                  },
                  {
                    name: "Số lượng đơn vị",
                    data: card?.countUnitMalware || 0,
                  },
                ]}
                link="/detail-malware"
                color="yellow"
                icon="fa fa-bug"
                total={
                  card?.countdeviceMalwareLV2 + card?.countdeviceMalwareLV1
                }
                name="Thiết bị có cảnh báo mã độc"
              />
            </div>

            {/* <div className="col-xl-3 col-md-6">
            <Cards
              data={card.fmc}
              link="/alert"
              color="blue"
              icon="phone-incoming"
              name="Cảnh báo dấu hiệu mất an toàn"
            />
          </div> */}
          </div>
        </section>
        {/* End section card */}
        {/* Start section Pie */}
        <section name="pie">
          <div className="row">
            <div className="col-xl-4 col-md-6">
              <CardWrapper
                align="center"
                header={{
                  name: "Cài đặt Agent",
                  detail: "",
                }}
              >
                <ArmChartPie
                  data={[
                    {
                      name: "Đang hoạt động",
                      count: card?.countMiAVActive || 0,
                      color: am4core.color("#16b2e9"),
                      url: "/device?filter=status_install_miav,=,Đang hoạt động",
                    },
                    {
                      name: "Không hoạt động",
                      count: card?.countMiAVNotConnect || 0,
                      color: am4core.color("#ff3025"),
                      url: "/device?filter=status_install_miav,=,Mất kết nối",
                    },
                    {
                      name: "Chưa cài đặt",
                      count: card?.countMiAVNotInstall || 0,
                      color: am4core.color("#6d6270"),
                      url: "/device?filter=status_install_miav,=,Chưa cài đặt",
                    },
                  ]}
                  id="fmc"
                  field="count"
                  category="name"
                  total={
                    card?.countMiAVActive +
                    card?.countMiAVNotConnect +
                    card?.countMiAVNotInstall
                  }
                  customShow={`Tổng:${
                    card?.countMiAVActive + card?.countMiAVNotConnect
                  }`}
                ></ArmChartPie>
              </CardWrapper>
            </div>
            <div className="col-xl-4 col-md-6">
              <CardWrapper
                align="center"
                header={{
                  name: "Định danh thiết bị",
                  detail: "",
                }}
              >
                <ArmChartPie
                  data={[
                    {
                      name: "Đã định danh",
                      count: card?.countDeviceIdent || 0,
                      color: am4core.color("#ffd454"),
                      url: "/device?filter=status_ident,=,Đã định danh",
                    },
                    {
                      name: "Chưa định danh",
                      count: card?.countDeviceNotIdent || 0,
                      color: am4core.color("#ffaa54"),
                      url: "/device?filter=status_ident,=,Chưa định danh",
                    },
                  ]}
                  id="miAV"
                  field="count"
                  category="name"
                  total={card?.countDeviceIdent + card?.countDeviceNotIdent}
                ></ArmChartPie>
              </CardWrapper>
            </div>
            <div className="col-xl-4 col-md-6">
              <CardWrapper
                align="center"
                header={{
                  name: "Quản lý tình trạng máy chủ",
                  detail: "",
                }}
              >
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <ArmChartPie
                    id="fmsPie"
                    data={[
                      {
                        name: "Số lượng Online",
                        count: card?.countFMSOnline + card?.countFMCOnline,
                        color: am4core.color("#fe9365"),
                        url: "/software?filter=status,=,Hoạt động",
                      },
                      {
                        name: "Số lượng Offline",
                        count: card?.countFMSOffline + card?.countFMCOffline,
                        color: am4core.color("#fe6c65"),
                        url: "/software?filter=status,=,Mất kết nối",
                      },
                    ]}
                    field="count"
                    category="name"
                    total={
                      card?.countFMSOnline +
                      card?.countFMCOnline +
                      card?.countFMSOffline +
                      card?.countFMCOffline
                    }
                    customShow={`Online/Offline: Server: ${card?.countFMSOnline}/${card?.countFMSOffline} | Network: ${card?.countFMCOnline}/${card?.countFMCOffline}`}
                  ></ArmChartPie>
                  {/* <ArmChartPie
                    id="fmcPie"
                    data={[
                      {
                        name: 'FMC Online',
                        count: card?.countFMCOnline || 0,
                        color: am4core.color('#642bff'),
                      },
                      {
                        name: 'FMC Offline',
                        count: card?.countFMCOffline || 0,
                        color: am4core.color('#ffb12b'),
                      },
                    ]}
                    field="count"
                    category="name"
                  ></ArmChartPie> */}
                </div>
              </CardWrapper>
            </div>
            {/* <div className="col-xl-3 col-md-6">
            <CardWrapper
              align="center"
              header={{
                name: 'Biểu đồ thống kê số lượng cảnh báo',
                detail: '',
              }}
            >
              <ArmChart
                data={alert}
                id="alert"
                field="count"
                category="name"
              ></ArmChart>
            </CardWrapper>
          </div> */}
          </div>
        </section>
        {/* End section Pie */}
        <section name="column">
          <div className="row">
            <div className="col-xl-12 col-md-12">
              <CardWrapper
                align="left"
                header={{
                  name: "Biểu đồ thống kê thiết bị nhiễm mã độc theo từng đơn vị",
                  detail: "",
                }}
              >
                <ArmChartColumn
                  url="/detail-malware?filter=unit_full_name,contains,"
                  id="chartMalware"
                  xAxisName="Đơn vị"
                  yAxisName="Số lượng"
                  data={chartMalware}
                  color="#1fc9e0"
                />
              </CardWrapper>
            </div>
          </div>
        </section>
        <section name="column">
          <div className="row">
            <div className="col-xl-12 col-md-12">
              <CardWrapper
                align="left"
                header={{
                  name: "Biểu đồ thống kê thiết bị kết nối máy chủ điều khiển (C&C) theo từng đơn vị",
                  detail: "",
                }}
              >
                <ArmChartColumn
                  url="/detail-candc?filter=unit_full_name,contains,"
                  id="chartCandC"
                  xAxisName="Đơn vị"
                  yAxisName="Số lượng"
                  data={chartCandC}
                  color="#1fc9e0"
                />
              </CardWrapper>
            </div>
          </div>
        </section>
        <section name="column">
          <div className="row">
            <div className="col-xl-12 col-md-12">
              <CardWrapper
                align="left"
                header={{
                  name: "Biểu đồ thống kê cảnh báo theo từng đơn vị",
                  detail: "",
                }}
              >
                <ArmChartColumn
                  url="/alert?filter=unit_full_name,contains,"
                  id="chartAlert"
                  xAxisName="Đơn vị"
                  yAxisName="Số lượng"
                  data={chartAlert}
                  color="#1fc9e0"
                />
              </CardWrapper>
            </div>
          </div>
        </section>
      </div>
    </Spin>
  );
}
