import { Button, Form, Input, Progress } from "antd";
import React from "react";
import { useLocationsCreateMutation } from "../redux/api";

export default function LocationForm(props: ParentModalProps) {
  const [formProgress, setFormProgress] = React.useState(0);
  const [addLocation] = useLocationsCreateMutation();
  const [form] = Form.useForm();
  const onFinish = (values: { title: string; description: string }) => {
    addLocation({ locationRequest: values })
      .unwrap()
      .then(() => {
        props.handleClose?.();
        form.resetFields();
        props.msg.success("Location added");
      })
      .catch((error) => {
        props.msg.error(`Error while adding an item ${error.status} ${JSON.stringify(error.data)}`);
      });
  };

  return (
    <Form
      onFieldsChange={(changeFields, allFields) => {
        setFormProgress((allFields.filter((field) => field.value).length / allFields.length) * 100);
      }}
      form={form}
      scrollToFirstError
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
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
      <Progress percent={formProgress} size="small" status="active" />
    </Form>
  );
}
