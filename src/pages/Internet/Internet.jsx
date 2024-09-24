import CardWrapper from '../../components/CardWrapper'
import DataGrid from '../../components/Grid'
import { getListInternet } from '../../apis/Internet.api.js'
import { useState, useEffect } from 'react'
import {
  Column,
  Summary,
  TotalItem,
  Selection,
} from 'devextreme-react/data-grid'
import AddIdToArray from '../../helpers/AddIdToArray'
export default function Fms() {
  const [listInternet, setListInternet] = useState([])

  let loadData = async () => {
    // ? data fake
    // let { data } = await getListInternet() //! du lieu get tu api
    let data = [
      {
        index: 0,
        MAC: 'AA-6A-5B-3C-2F',
        IP: '192.168.1.1',
        computerName: 'laptop',
        unitName: 'Trường TCKT TTG Khu A - Binh chủng TTG',
        userName: 'Do Minh Thích',
        timeReceive: '2023-01-27 00:22:16',
        description: '[Internet outlet:2023-01-27 00:22:16]',
      },
    ]
    data = AddIdToArray(data)
    setListInternet([...data])
  }

  useEffect(() => {
    loadData()
  }, [])
  return (
    <CardWrapper
      header={{
        name: 'Danh sách thiết bị vi phạm quy định',
        detail: 'Thống kê thiết bị vi phạm quy định theo đơn vị và thời gian',
      }}
    >
      <DataGrid data={listInternet} id={'index'} formItem={{ visible: false }}>
        <Selection mode="single" />
        <Column dataField="index" caption="STT" width="50" />
        <Column dataField="MAC" caption="MAC" />
        <Column dataField="IP" caption="Địa chỉ IP" />
        <Column dataField="computerName" caption="Tên máy tính" />
        <Column dataField="unitName" caption="Tên Đơn vị" />
        <Column dataField="userName" caption="Tên người dùng" />
        <Column dataField="timeReceive" caption="Thời gian" />
        <Column dataField="description" caption="Mô tả" />
        {/* <MasterDetail
          enabled={true}
          component={(e) => {
            return (
              <div>
                <div>
                  <span>Create Key:</span>
                  <button
                    style={{ dislay: 'inline-block', marginLeft: '20px' }}
                    onClick={() => {
                      onGenKey(e)
                    }}
                  >
                    <i className="ion-plus"></i>
                  </button>
                </div>
                <span>Serial key:</span>
                <ClipboardCopy
                  copyText={e.data.data.serial || 'Không có serial'}
                />
              </div>
            )
          }}
        /> */}
        <Summary>
          <TotalItem column="_id" summaryType="count" />
        </Summary>
        {/* <Editing
          mode="form"
          allowUpdating={true}
          allowAdding={true}
          allowDeleting={true}
          useIcons={true}
        /> */}
      </DataGrid>
    </CardWrapper>
  )
}
