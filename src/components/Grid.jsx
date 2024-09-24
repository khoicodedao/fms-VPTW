import React from "react";
import DataGrid, {
  Scrolling,
  Sorting,
  LoadPanel,
  SearchPanel,
} from "devextreme-react/data-grid";

const Grid = (props) => {
  let {
    data,
    id,
    onRowInserted,
    onRowUpdated,
    onRowRemoved,
    onSelectionChanged,
    onInitNewRow,
  } = props;

  return (
    <DataGrid
      onInitNewRow={onInitNewRow}
      height={440}
      dataSource={data}
      keyExpr={id}
      showBorders={true}
      allowColumnResizing={true}
      // columnResizingMode="nextColumn"
      onRowInserted={onRowInserted}
      onRowUpdated={onRowUpdated}
      onRowRemoved={onRowRemoved}
      onSelectionChanged={onSelectionChanged}
      showColumnLines={true}
      showRowLines={true}
    >
      <SearchPanel visible={true} width={240} placeholder="Search..." />
      <Sorting mode="none" />
      <Scrolling mode="virtual" />
      <LoadPanel enabled={true} />
      {props.children}
    </DataGrid>
  );
};

export default Grid;
