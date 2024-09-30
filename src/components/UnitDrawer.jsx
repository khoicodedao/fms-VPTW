import React, { useState } from "react";
import { Button, Drawer } from "antd";
import Unit from "../pages/Unit/Unit";

export default function UnitDrawer({ onFocusedRowChanged }) {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Unit onFocusedRowChanged={onFocusedRowChanged}></Unit>
    </>
  );
}
