import { MinusCircleTwoTone, PlusCircleTwoTone } from "@ant-design/icons";
import { Button, DatePicker, Pagination, Select, Space, Table, Tag } from "antd";
import { ColumnFilterItem } from "antd/es/table/interface";
import dayjs from "dayjs";
import _ from "lodash";
import React from "react";
import {
  BaseLocation,
  ReprBaseItem,
  useItemsChoicesRetrieveQuery,
  useItemsListQuery,
  useItemsPartialUpdateMutation
} from "../app/api";
import ItemForm from "./ItemForm";
import LocationForm from "./LocationForm";
import ModalPopup from "./ModalPopup";
import { defaultPagination } from "../settings/settings";

export default function ItemTable() {
  const [pagination, setPagination] = React.useState(defaultPagination);
  const { data, isLoading } = useItemsListQuery(pagination);
  const { data: choices } = useItemsChoicesRetrieveQuery();
  const { data: locations } = useItemsListQuery(pagination);
  const [patchItem] = useItemsPartialUpdateMutation();

  const buildFilter = (value: string) => {
    const fieldChoices: ColumnFilterItem[] = [];
    if (choices) {
      const fieldChoice = _.find(choices, { field: value });
      fieldChoice?.values.map((item: string | number | boolean) => {
        fieldChoices.push({
          text: String(item)[0] + String(item).slice(1).toLowerCase(),
          value: item
        });
      });
    } else {
      return [];
    }
    return fieldChoices;
  };
  const buildLocationFilter = () => {
    const fieldChoices: ColumnFilterItem[] = [];
    locations?.results?.map((location: BaseLocation) => {
      fieldChoices.push({
        text: location.title,
        value: location.id
      });
    });
    return fieldChoices;
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      width: "30%"
    },
    {
      title: "Category",
      dataIndex: "category",
      width: "5%",
      filters: buildFilter("category"),
      sorter: {
        compare: (a: ReprBaseItem, b: ReprBaseItem) => a.category.localeCompare(b.category)
      },
      render: (text: string) => (
        <React.Fragment>
          <Tag color="green">{text}</Tag>
        </React.Fragment>
      ),
      onFilter: (value: string | number | boolean, record: ReprBaseItem) =>
        record.category?.startsWith(value.toString())
    },
    {
      title: "Location",
      dataIndex: "location",
      width: "5%",
      filters: buildLocationFilter(),
      render: (text: string, record: ReprBaseItem) => (
        <React.Fragment>
          <Select
            defaultValue={record.location.id}
            options={locations?.results?.map((item) => {
              return { value: item.id, label: item.title };
            })}
            onChange={(value) => {
              patchItem({ id: record.id, patchedItemRequest: { location: value } });
            }}
          />
        </React.Fragment>
      ),
      sorter: {
        compare: (a: ReprBaseItem, b: ReprBaseItem) =>
          a.location.title.localeCompare(b.location.title)
      },
      onFilter: (value: string | number | boolean, record: ReprBaseItem) =>
        record.location.id == value
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      width: "5%",
      sorter: {
        compare: (a: ReprBaseItem, b: ReprBaseItem) => a.quantity - b.quantity
      },
      render: (text: string, record: ReprBaseItem) => (
        <>
          <Space>
            <Button
              type="primary"
              onClick={() =>
                patchItem({ id: record.id, patchedItemRequest: { quantity: record.quantity - 1 } })
              }
            >
              <MinusCircleTwoTone />
            </Button>
            {text}
            <Button
              type="primary"
              onClick={() =>
                patchItem({ id: record.id, patchedItemRequest: { quantity: record.quantity + 1 } })
              }
            >
              <PlusCircleTwoTone />
            </Button>
          </Space>
        </>
      )
    },
    {
      title: "Expiration",
      dataIndex: "expiration_date",
      width: "40%",
      render: (text: string, record: ReprBaseItem) => (
        <React.Fragment>
          <DatePicker
            defaultValue={dayjs(text)}
            onChange={(date, dateString) => {
              if (date) {
                patchItem({ id: record.id, patchedItemRequest: { expiration_date: dateString } });
              }
            }}
          />
        </React.Fragment>
      )
    },
    {
      title: "Time to live in days",
      dataIndex: "ttl",
      sorter: {
        compare: (a: ReprBaseItem, b: ReprBaseItem) => a.ttl - b.ttl
      }
    }
  ];

  return (
    <React.Fragment>
      <Space>
        <ModalPopup message="Add new Item">
          <ItemForm />
        </ModalPopup>
        <ModalPopup message="Add new Location">
          <LocationForm />
        </ModalPopup>
      </Space>
      <Table
        loading={isLoading}
        bordered
        columns={columns}
        dataSource={data?.results}
        rowKey="id"
        pagination={false}
      />
      <Pagination
        pageSize={pagination.pageSize}
        current={pagination.page}
        showTotal={(total) => `Total ${total} items`}
        total={data?.count}
        onChange={(page) => setPagination({ ...pagination, page })}
      />
    </React.Fragment>
  );
}
