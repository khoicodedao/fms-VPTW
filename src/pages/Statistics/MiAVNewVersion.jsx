import CardWrapper from '../../components/CardWrapper'
import { useState, useEffect } from 'react'
import DataGrid, {
  Export,
  GroupPanel,
  Selection,
} from 'devextreme-react/data-grid'
import { Column } from 'devextreme-react/data-grid'
import { getStatisticMiAV } from '../../apis/Statistic.api'
import { useSelector } from 'react-redux'
import { Input } from 'antd'
import BugOutlined from '@ant-design/icons/BugOutlined'
import onExporting from '../../helpers/exportExcelFunction'

export default function MiAVNewVersion() {
  let { startDate, endDate } = useSelector((state) => state.changeDateReducer)
  const [miAVVersion, setMiAVVersion] = useState('')
  const [data, setData] = useState([])
  const loadData = async (value) => {
    let { data } = await getStatisticMiAV({
      version: value,
      start_date: startDate,
      end_date: endDate,
      unit_code: 'all',
    })

    setData([...data])
  }

  return (
    <div className="row">
      <div className="col-md-12 col-xl-12">
        <CardWrapper
          header={{
            name: 'MiAV Phiên bản mới',
            detail:
              'Thống kê danh sách thiết bị cài đặt MiAV theo phiên bản mới',
          }}
        >
          <Input
            placeholder="Phiên bản MIAV"
            className="mb-2"
            value={miAVVersion}
            style={{ width: '20%' }}
            addonAfter={<BugOutlined />}
            onChange={(e) => {
              setMiAVVersion(e.target.value)
              loadData(e.target.value)
            }}
          />
          <GroupPanel visible={true} />
          <DataGrid
            keyExpr="_id"
            onExporting={onExporting}
            dataSource={data}
            showBorders={true}
            remoteOperations={true}
            showColumnLines={true}
            showRowLines={true}
            rowAlternationEnabled={true}
            allowColumnResizing={true}
            columnResizingMode={'widget'}
            columnAutoWidth={true}
          >
            <Selection mode="multiple" />
            <Column dataField="_id" caption="Tên đơn vị" />
            <Column dataField="count" caption="Số lượng" />
            <Export enabled={true} allowExportSelectedData={true} />
          </DataGrid>
          <Export enabled={true} allowExportSelectedData={true} />
        </CardWrapper>
      </div>
    </div>
  )
}
