import { DatePicker, InputNumber, Select, Space, Table, Tag, Typography } from "antd";
import { ColumnFilterItem, ColumnsType } from "antd/es/table/interface";
import dayjs from "dayjs";
import _ from "lodash";
import React from "react";
import {
  BaseLocation,
  ReprBaseItem,
  useItemsChoicesRetrieveQuery,
  useItemsListQuery,
  useItemsPartialUpdateMutation,
  useLocationsListQuery
} from "../redux/api";
import ItemForm from "./ItemForm";
import LocationForm from "./LocationForm";
import ModalPopup from "./ModalPopup";
import { defaultPagination } from "../settings/settings";
import { usePagination } from "../hooks/usePagination";

export default function ItemTable() {
  const [page, setPage] = React.useState(defaultPagination.page);
  const [pageSize, setPageSize] = React.useState(defaultPagination.pageSize);
  const { data: items, isLoading } = useItemsListQuery({ page: page, pageSize: pageSize });
  const { data: choices } = useItemsChoicesRetrieveQuery();
  const { data: locations } = useLocationsListQuery(defaultPagination);
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
  const renderTitle = (record: ReprBaseItem) => {
    return <Typography.Text>{record.title}</Typography.Text>;
  };
  const renderCategory = (record: ReprBaseItem) => {
    return <Tag color="green">{record.category}</Tag>;
  };
  const renderLocation = (record: ReprBaseItem) => {
    return (
      <Select
        defaultValue={record.location.id}
        options={locations?.results?.map((item) => {
          return { value: item.id, label: item.title };
        })}
        onChange={(value) => {
          patchItem({ id: record.id, patchedItemRequest: { location: value } });
        }}
      />
    );
  };

  const renderQuantity = (record: ReprBaseItem) => {
    return (
      <InputNumber
        value={record.quantity}
        onChange={(e) => {
          if (e) {
            patchItem({ id: record.id, patchedItemRequest: { quantity: e } });
          }
        }}
      />
    );
  };
  const renderExpirationDate = (record: ReprBaseItem) => {
    return (
      <DatePicker
        defaultValue={dayjs(record.expiration_date)}
        onChange={(date, dateString) => {
          if (date) {
            patchItem({ id: record.id, patchedItemRequest: { expiration_date: dateString } });
          }
        }}
      />
    );
  };
  const renderTtl = (record: ReprBaseItem) => {
    return <Typography.Text>{record.ttl}</Typography.Text>;
  };

  const columns: ColumnsType<ReprBaseItem> = [
    {
      title: "Title/Category",
      width: "5%",
      responsive: ["xs"],
      render: (record: ReprBaseItem) => (
        <Space.Compact direction="vertical">
          {renderTitle(record)}
          {renderCategory(record)}
        </Space.Compact>
      )
    },
    {
      title: "Title",
      dataIndex: "title",
      width: "10%",
      responsive: ["sm"]
    },
    {
      title: "Category",
      width: "5%",
      responsive: ["sm"],
      filters: buildFilter("category"),
      sorter: {
        compare: (a: ReprBaseItem, b: ReprBaseItem) => a.category.localeCompare(b.category)
      },
      render: (record: ReprBaseItem) => renderCategory(record),
      onFilter: (value: string | number | boolean, record: ReprBaseItem) =>
        record.category?.startsWith(value.toString())
    },
    {
      title: "Location/Quantity",
      responsive: ["xs"],
      render: (record: ReprBaseItem) => (
        <Space.Compact direction="vertical">
          {renderLocation(record)}
          {renderQuantity(record)}
        </Space.Compact>
      )
    },
    {
      title: "Location",
      dataIndex: "location",
      width: "5%",
      responsive: ["sm"],
      filters: buildLocationFilter(),
      render: (text: string, record: ReprBaseItem) => renderLocation(record),
      sorter: {
        compare: (a: ReprBaseItem, b: ReprBaseItem) =>
          a.location.title.localeCompare(b.location.title)
      },
      onFilter: (value: string | number | boolean, record: ReprBaseItem) =>
        record.location.id == value
    },
    {
      title: "Quantity",
      width: "2.5%",
      responsive: ["sm"],
      sorter: {
        compare: (a: ReprBaseItem, b: ReprBaseItem) => a.quantity - b.quantity
      },
      render: (record: ReprBaseItem) => renderQuantity(record)
    },
    {
      title: "Expiration/TTL",
      responsive: ["xs"],
      render: (record: ReprBaseItem) => (
        <Space.Compact direction="vertical">
          {renderExpirationDate(record)}
          {renderTtl(record)}
        </Space.Compact>
      )
    },
    {
      title: "Expiration",
      width: "10%",
      responsive: ["sm"],
      render: (record: ReprBaseItem) => renderExpirationDate(record)
    },
    {
      title: "Time to live in days",
      responsive: ["sm"],
      render: (record: ReprBaseItem) => renderTtl(record),
      sorter: {
        compare: (a: ReprBaseItem, b: ReprBaseItem) => a.ttl - b.ttl
      }
    }
  ];

  const tablePagination = usePagination<ReprBaseItem>({
    name: "items-table",
    total: items?.count,
    pageSize: pageSize,
    setPage,
    setPageSize
  });

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
        size="small"
        columns={columns}
        dataSource={items?.results}
        rowKey="id"
        pagination={tablePagination}
      />
    </React.Fragment>
  );
}
