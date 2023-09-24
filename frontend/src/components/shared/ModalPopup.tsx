import { Button, Modal, message } from "antd";
import React from "react";

interface ModalProps {
  message: string;
  children: React.ReactElement;
  handler?: (value: string) => void;
}
export default function ModalPopup(props: ModalProps) {
  const [open, setOpen] = React.useState(false);
  const [msg, contextHolder] = message.useMessage();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const child = React.Children.map(props.children, (el) => {
    return React.cloneElement(el, { handleClose: handleClose, msg: msg, handler: props.handler });
  });

  return (
    <React.Fragment>
      <Button type="primary" size="large" onClick={handleClickOpen}>
        {props.message}
      </Button>
      <Modal footer={null} title={props.message} open={open} onCancel={handleClose}>
        {contextHolder}
        {child}
      </Modal>
    </React.Fragment>
  );
}
