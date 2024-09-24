import React, { useState } from 'react'
import { Button, Drawer } from 'antd'
import Unit from '../pages/Unit/Unit'

export default function UnitDrawer({ onFocusedRowChanged }) {
  const [open, setOpen] = useState(false)
  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }
  return (
    <>
      <Drawer
        title="Lựa chọn đơn vị"
        placement="right"
        onClose={onClose}
        open={open}
      >
        <Unit onFocusedRowChanged={onFocusedRowChanged}></Unit>
      </Drawer>
      <Button type="primary" className="mb-2" onClick={showDrawer}>
        Đơn vị
      </Button>
    </>
  )
}
