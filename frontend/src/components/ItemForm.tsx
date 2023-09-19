import { AutoComplete, Button, DatePicker, Form, InputNumber, Progress, Select } from "antd";
import dayjs from "dayjs";
import _ from "lodash";
import React, { useEffect } from "react";
import {
  ItemRequest,
  useItemsChoicesRetrieveQuery,
  useItemsCreateMutation,
  useItemsSearchCreateMutation,
  useLocationsListQuery
} from "../redux/api";
import { DateFormat, defaultPagination } from "../settings/settings";
import { DefaultOptionType } from "antd/es/select";
import { QrScanner } from "@yudiel/react-qr-scanner";

export default function ItemForm(props: ParentModalProps) {
  // * Due to quantity already filled
  const [formProgress, setFormProgress] = React.useState(20);
  const { data: locations } = useLocationsListQuery(defaultPagination);
  const { data: choices } = useItemsChoicesRetrieveQuery();
  const [addItem] = useItemsCreateMutation();
  const [form] = Form.useForm();
  const [searchItem, { data: suggestions, isLoading: isLoadingSuggestions }] =
    useItemsSearchCreateMutation();
  const [barcode, setBarcode] = React.useState("");
  const buildOptions = () => {
    const options: DefaultOptionType[] = [];
    if (!isLoadingSuggestions) {
      suggestions?.forEach((item) => {
        options.push({ value: item.title, label: item.title });
      });
    } else {
      return [];
    }
    return options;
  };
  const onFinish = (values: ItemRequest) => {
    values.expiration_date = dayjs(values.expiration_date).format(DateFormat);
    addItem({ itemRequest: values })
      .unwrap()
      .then(() => {
        props.handleClose?.();
        form.resetFields();
        props.msg.success("Item added");
      })
      .catch((error) => {
        props.msg.error(`Error while adding an item ${error.status} ${JSON.stringify(error.data)}`);
      });
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

  // * Category can be taken from choices that was loaded previously
  const renderCategorySelector = () => {
    const category = _.find(choices, { field: "category" });
    return category?.values.map((item, index) => {
      return (
        <Select.Option key={index} value={item}>
          {item}
        </Select.Option>
      );
    });
  };

  useEffect(() => {
    if (barcode) {
      searchItem({ itemSearchRequest: { barcode: barcode } });
    }
  }, [barcode]);
  return (
    <Form
      form={form}
      onFieldsChange={(changeFields, allFields) => {
        setFormProgress((allFields.filter((field) => field.value).length / allFields.length) * 100);
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
        rules={[
          { required: true, message: "Please input Title" },
          { max: 50, message: "Make it shorter" }
        ]}
      >
        <AutoComplete
          allowClear
          defaultOpen
          options={buildOptions()}
          style={{ width: 200 }}
          placeholder="input here"
        />
      </Form.Item>
      <QrScanner
        onDecode={(result) => setBarcode(result)}
        onError={(error) => props.msg?.error(error.message)}
      />
      <Form.Item label="quantity" name="quantity" rules={[{ required: true }]}>
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
        rules={[{ required: true, message: "Please select expiration date" }]}
      >
        <DatePicker
          disabledDate={(current) => {
            return dayjs() >= current;
          }}
        />
      </Form.Item>
      <Button type="primary" htmlType="submit" block>
        Create Item
      </Button>
      <Progress percent={formProgress} size="small" status="active" />
    </Form>
  );
}
