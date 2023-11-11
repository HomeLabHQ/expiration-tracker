import {
  AutoComplete,
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Progress,
  Row,
  Select,
  Space
} from "antd";
import dayjs from "dayjs";
import React from "react";
import {
  ItemRequest,
  useItemsCreateMutation,
  useItemsSearchCreateMutation,
  useLocationsListQuery
} from "../../redux/api";
import { DateFormat, defaultPagination } from "../../settings/settings";
import { DefaultOptionType } from "antd/es/select";
import { QrScanner } from "@yudiel/react-qr-scanner";
import ItemEnumSelector from "./ItemEnumSelector";
import { BarcodeOutlined } from "@ant-design/icons";
import { getProgress } from "../../hooks/getProgress";
import ModalPopup from "../shared/ModalPopup";
import LocationForm from "../LocationForm";

export default function ItemForm(props: Readonly<ParentModalProps>) {
  const [formProgress, setFormProgress] = React.useState(40);
  const [options, setOptions] = React.useState<DefaultOptionType[]>([]);
  const [form] = Form.useForm();
  const { data: locations } = useLocationsListQuery(defaultPagination);
  const [addItem] = useItemsCreateMutation();
  const [suggests, setSuggests] = React.useState(false);
  const [scanner, setScanner] = React.useState(false);
  const [searchItem] = useItemsSearchCreateMutation();
  const submit = (values: ItemRequest, reuse: boolean) => {
    values.expiration_date = dayjs(values.expiration_date).format(DateFormat);
    if (!reuse) {
      addItem({ itemRequest: values })
        .unwrap()
        .then(() => {
          props.handleClose?.();
          form.resetFields();
          setOptions([]);
          props.msg.success("Item added");
        })
        .catch((error) => {
          props.msg.error(
            `Error while adding an item ${error.status} ${JSON.stringify(error.data)}`
          );
        });
    } else {
      addItem({ itemRequest: values })
        .unwrap()
        .then(() => {
          props.msg.success("Item added");
          form.setFieldsValue({ title: null });
          setScanner(true);
          setOptions([]);
        })
        .catch((error) => {
          props.msg.error(
            `Error while adding an item ${error.status} ${JSON.stringify(error.data)}`
          );
        });
    }
  };

  const renderLocationSelector = () => {
    return locations?.results?.map((location) => {
      return (
        <Select.Option key={location.id} value={location.id}>
          {location.title}
        </Select.Option>
      );
    });
  };

  // * Category and status can be taken from choices that was loaded previously

  return (
    <Form
      form={form}
      onFieldsChange={(changedFields, allFields) =>
        getProgress({ allFields, handler: setFormProgress })
      }
      requiredMark="optional"
      scrollToFirstError
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      style={{ maxWidth: 600 }}
      onFinish={(values) => submit(values, false)}
      initialValues={{ category: "GOODS", status: "STOCK", upc: "" }}
    >
      <Row>
        <Form.Item
          label="Title"
          name="title"
          rules={[
            { required: true, message: "Please input Title" },
            { max: 250, message: "Make it shorter" }
          ]}
        >
          <AutoComplete
            allowClear
            options={options}
            style={{ width: 300 }}
            open={suggests}
            onSelect={() => setSuggests(false)}
          />
        </Form.Item>
        <Button onClick={() => setScanner(!scanner)}>
          Scan
          <BarcodeOutlined />
        </Button>
        {scanner && (
          <QrScanner
            onResult={(result) => {
              searchItem({ itemSearchRequest: { barcode: result.getText() } })
                .unwrap()
                .then((data) => {
                  const results: DefaultOptionType[] = [];
                  data.forEach((item) => {
                    results.push({ value: item.title, label: item.title });
                  });
                  setOptions(results);
                  setSuggests(true);
                });
              setScanner(!scanner);
              form.setFieldsValue({ upc: result.getText() });
            }}
            onError={() => console.info("Scanner error")}
          />
        )}
      </Row>

      <Row>
        <Col xs={12}>
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please select category" }]}
          >
            <Select>{ItemEnumSelector("category")}</Select>
          </Form.Item>
        </Col>
        <Col xs={12}>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please select status" }]}
          >
            <Select>{ItemEnumSelector("status")}</Select>
          </Form.Item>
        </Col>
      </Row>
      {locations?.results?.length ? (
        <Form.Item
          label="Location"
          name="location"
          rules={[{ required: true, message: "Please select location" }]}
        >
          <Select>{renderLocationSelector()}</Select>
        </Form.Item>
      ) : (
        <ModalPopup message="Add Location">
          <LocationForm />
        </ModalPopup>
      )}

      <Form.Item
        label="Expiration date"
        required
        name="expiration_date"
        rules={[{ required: true, message: "Please select expiration date" }]}
      >
        <DatePicker
          disabledDate={(current) => {
            return dayjs() >= current;
          }}
        />
      </Form.Item>
      <Form.Item hidden name="upc">
        <Input type="hidden" />
      </Form.Item>
      <Space>
        <Button type="primary" htmlType="submit" block>
          Create
        </Button>
        <Button
          type="primary"
          onClick={() =>
            form
              .validateFields()
              .then(() => {
                submit(form.getFieldsValue(), true);
                setOptions([]);
              })
              .catch((e) => console.log(e))
          }
        >
          Create & add another
        </Button>
      </Space>
      <Progress percent={formProgress} size="small" status="active" />
    </Form>
  );
}
