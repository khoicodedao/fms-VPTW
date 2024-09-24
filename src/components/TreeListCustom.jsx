import React from 'react'
import { TreeList, SearchPanel, Selection } from 'devextreme-react/tree-list'

export default function TreeListCustom(props) {
  let { id, keyExpr, parentIdExpr, data, children, onFocusedRowChanged } = props
  let expandedRowKeys = localStorage.getItem('expandRowKeys').split(',')
  return (
    <TreeList
      autoExpandAll={true}
      selectionMode="single"
      focusedRowEnabled={true}
      id={id}
      dataSource={data}
      rootValue={-1}
      defaultExpandedRowKeys={expandedRowKeys}
      showRowLines={true}
      showBorders={true}
      columnAutoWidth={true}
      keyExpr={keyExpr}
      parentIdExpr={parentIdExpr}
      onFocusedRowChanged={onFocusedRowChanged}
    >
      <Selection mode="single" />
      <SearchPanel visible={true} />
      {children}
    </TreeList>
  )
}
