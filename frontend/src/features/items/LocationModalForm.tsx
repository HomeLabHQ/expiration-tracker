import { Button, Form, Input, Modal, Progress, message } from "antd"
import React from "react"
import { useAddLocationMutation } from "../../app/api"

export default function LocationModalForm() {
  const [open, setOpen] = React.useState(false)
  const [formProgress, setFormProgress] = React.useState(0)
  const [addLocation] = useAddLocationMutation()
  const [form] = Form.useForm()
  const [msg, contextHolder] = message.useMessage()
  const onFinish = (values: Location) => {
    addLocation(values)
      .unwrap()
      .then(() => {
        handleClose()
        form.resetFields()
        msg.success("Location added")
      })
      .catch((error) => {
        msg.error(
          `Error while adding an item ${error.status} ${JSON.stringify(
            error.data,
          )}`,
        )
      })
  }
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <React.Fragment>
      {contextHolder}
      <Button type="primary" size="large" onClick={handleClickOpen}>
        Add new location
      </Button>
      <Modal
        footer={null}
        title="Add new location"
        open={open}
        onCancel={handleClose}
      >
        <Form
          onFieldsChange={(changeFields, allFields) => {
            setFormProgress(
              (allFields.filter((field) => field.value).length /
                allFields.length) *
                100,
            )
          }}
          scrollToFirstError
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          initialValues={{ quantity: 1 }}
        >
          <Form.Item
            label="title"
            name="title"
            rules={[{ required: true, message: "Please input Title" }]}
          >
            <Input name="title" />
          </Form.Item>
          <Form.Item
            label="description"
            name="description"
            rules={[{ required: true, message: "Please input description" }]}
          >
            <Input name="description" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Create Location
          </Button>
        </Form>
        <Progress percent={formProgress} size="small" status="active" />
      </Modal>
    </React.Fragment>
  )
}
