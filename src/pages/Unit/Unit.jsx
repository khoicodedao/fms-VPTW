import CardWrapper from '../../components/CardWrapper'
import { Column } from 'devextreme-react/tree-list'
import TreeListCustom from '../../components/TreeListCustom'
import { useState, useEffect } from 'react'
import { getListUnit, getListUnitChild } from '../../apis/Unit.api'
import { useSelector } from 'react-redux'
import constValues from '../../helpers/constValues'

import LocalStorage from './../../helpers/LocalStorage'

export default function Unit(props) {
  const unitGlobal = useSelector((state) => state.unitCodeReducer)
  const userCondition = LocalStorage.get('user')
  let { onFocusedRowChanged } = props
  const [listUnit, setListUnit] = useState([])
  let loadData = async () => {
    let { data } = await getListUnit()
    if (unitGlobal !== 'all') {
      //when select unit in header
      // console.log(unitGlobal)
      let unit_list_child = userCondition?.conditions?.unit_list_child
      let dataChild = []
      if (unit_list_child) {
        dataChild = data.filter((item) => {
          return (
            item.parent_unit_code === unitGlobal ||
            unit_list_child.includes(item.parent_unit_code) ||
            unit_list_child.includes(item.unit_code)
          )
        })
      } else {
        dataChild = data.filter((item) => {
          return (
            item.parent_unit_code === unitGlobal ||
            item.unit_code === unitGlobal
          )
        })
      }
      setListUnit([
        ...dataChild,
        {
          _id: '1',
          name: 'Tất cả',
          full_name: 'Tất cả',
          unit_code: unitGlobal,
          parent_unit_code: '-1',
        },
      ])
    } else {
      let unitLV2List = data.filter(
        (child) => child.parent_unit_code == constValues.BQP_UNIT_CODE,
      )
      unitLV2List.length == 1
        ? setListUnit([
            ...data,
            // {
            //   _id: '1',
            //   name: 'Bộ Quốc Phòng',
            //   unit_code: constValues.BQP_UNIT_CODE,
            //   parent_unit_code: '-1',
            // },
          ])
        : setListUnit([...data])
    }
  }
  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    loadData()
  }, [unitGlobal])

  return (
    <CardWrapper>
      <div id="tree-list">
        <TreeListCustom
          id="tree-list-unit"
          parentIdExpr="parent_unit_code"
          keyExpr="unit_code"
          data={listUnit}
          onFocusedRowChanged={onFocusedRowChanged}
        >
          <Column dataField="name" caption="Tên đơn vị"></Column>
          <Column
            dataField="unit_code"
            name
            caption="Tên đơn vị"
            visible={false}
          ></Column>
        </TreeListCustom>
      </div>
    </CardWrapper>
  )
}
