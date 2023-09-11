import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Progress,
  Select,
  message,
} from "antd"
import dayjs from "dayjs"
import _ from "lodash"
import React from "react"
import { ShoppingCartOutlined } from "@ant-design/icons"
import {
  useAddItemMutation,
  useGetItemsChoicesQuery,
  useGetLocationsQuery,
} from "../../app/api"
import { DateFormat } from "../../constants/settings"

export default function ItemModalForm() {
  const [open, setOpen] = React.useState(false)
  // * Due to quantity already filled
  const [formProgress, setFormProgress] = React.useState(20)
  const { data: locations } = useGetLocationsQuery()
  const { data: choices } = useGetItemsChoicesQuery()
  const [addItem] = useAddItemMutation()
  // ? Can this be moved to root component?
  const [msg, contextHolder] = message.useMessage()
  const [form] = Form.useForm()

  const onFinish = (values: BaseItem) => {
    values.expiration_date = dayjs(values.expiration_date).format(DateFormat)
    addItem(values)
      .unwrap()
      .then(() => {
        handleClose()
        form.resetFields()
        msg.success("Item added")
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

  const renderLocationSelector = () => {
    return locations?.results?.map((location) => {
      return (
        <Select.Option key={location.id} value={location.id}>
          {location.title}
        </Select.Option>
      )
    })
  }

  // * Category can be taken from choices that was loaded previously
  const renderCategorySelector = () => {
    const category = _.find(choices, { field: "category" })
    return category?.values.map((item, index) => {
      return (
        <Select.Option key={index} value={item}>
          {item}
        </Select.Option>
      )
    })
  }

  return (
    <React.Fragment>
      {contextHolder}
      <Button type="primary" size="large" onClick={handleClickOpen}>
        <ShoppingCartOutlined /> Add new item
      </Button>
      <Modal
        footer={null}
        title="Add new item"
        open={open}
        onCancel={handleClose}
      >
        <Form
          form={form}
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
            label="quantity"
            name="quantity"
            rules={[{ required: true }]}
          >
            <InputNumber name="quantity" />
          </Form.Item>
          <Form.Item
            label="category"
            name="category"
            rules={[{ required: true, message: "Please select category" }]}
          >
            <Select>{renderCategorySelector()}</Select>
          </Form.Item>
          <Form.Item
            label="location"
            name="location"
            rules={[{ required: true, message: "Please select location" }]}
          >
            <Select>{renderLocationSelector()}</Select>
          </Form.Item>
          <Form.Item
            label="Expiration date"
            required
            name="expiration_date"
            rules={[
              { required: true, message: "Please select expiration date" },
            ]}
          >
            <DatePicker
              disabledDate={(current) => {
                return dayjs() >= current
              }}
            />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Create Item
          </Button>
        </Form>
        <Progress percent={formProgress} size="small" status="active" />
      </Modal>
    </React.Fragment>
  )
}
