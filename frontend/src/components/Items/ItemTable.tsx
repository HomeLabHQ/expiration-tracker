import { Button, DatePicker, Select, Space, Table, Tag, Typography } from "antd";
import { ColumnFilterItem, ColumnsType } from "antd/es/table/interface";
import dayjs from "dayjs";
import _ from "lodash";
import React from "react";
import {
  BaseLocationRead,
  ReprBaseItemRead,
  useItemsChoicesRetrieveQuery,
  useItemsListQuery,
  useItemsPartialUpdateMutation,
  useLocationsListQuery
} from "../../redux/api";
import ItemForm from "./ItemForm";
import LocationForm from "../LocationForm";
import ModalPopup from "../shared/ModalPopup";
import { DateFormat, defaultPagination } from "../../settings/settings";
import { usePagination } from "../../hooks/usePagination";
import ItemEnumSelector from "./ItemEnumSelector";
import Scanner from "../shared/Scanner";
import { CloseCircleOutlined } from "@ant-design/icons";

type FilterChoice = string | number | boolean;

export default function ItemTable() {
  const [page, setPage] = React.useState(defaultPagination.page);
  const [pageSize, setPageSize] = React.useState(defaultPagination.pageSize);
  const [upc, setUpc] = React.useState("");
  const { data: items, isLoading } = useItemsListQuery({
    page: page,
    pageSize: pageSize,
    upc: upc || undefined
  });
  const { data: choices } = useItemsChoicesRetrieveQuery();
  const { data: locations } = useLocationsListQuery(defaultPagination);
  const [patchItem] = useItemsPartialUpdateMutation();
  const buildFilter = (value: string) => {
    const fieldChoices: ColumnFilterItem[] = [];
    if (choices) {
      const fieldChoice = _.find(choices, { field: value });
      fieldChoice?.values.map((item: FilterChoice) => {
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
    locations?.results?.map((location: BaseLocationRead) => {
      fieldChoices.push({
        text: location.title,
        value: location.id
      });
    });
    return fieldChoices;
  };
  const renderTitle = (record: ReprBaseItemRead) => {
    return <Typography.Text>{record.title}</Typography.Text>;
  };
  const renderCategory = (record: ReprBaseItemRead) => {
    return <Tag color="green">{record.category}</Tag>;
  };
  const renderLocation = (record: ReprBaseItemRead) => {
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

  const statusOptions = ItemEnumSelector("status");
  const renderStatus = (record: ReprBaseItemRead) => {
    return (
      <Space.Compact direction="vertical">
        <Select
          defaultValue={record.status}
          onChange={(value) => {
            if (value == "OPENED") {
              patchItem({
                id: record.id,
                patchedItemRequest: { opening_date: dayjs().format(DateFormat), status: value }
              });
            } else {
              patchItem({ id: record.id, patchedItemRequest: { status: value } });
            }
          }}
        >
          {statusOptions}
        </Select>
        {record.status === "OPENED" && record.opening_date}
      </Space.Compact>
    );
  };

  const renderExpirationDate = (record: ReprBaseItemRead) => {
    return (
      <DatePicker
        defaultValue={dayjs(record.expiration_date)}
        disabledDate={(current) => {
          return dayjs() >= current;
        }}
        onChange={(date, dateString) => {
          if (date) {
            patchItem({ id: record.id, patchedItemRequest: { expiration_date: dateString } });
          }
        }}
      />
    );
  };
  const renderTtl = (record: ReprBaseItemRead) => {
    return <Typography.Text>{record.ttl}</Typography.Text>;
  };

  const columns: ColumnsType<ReprBaseItemRead> = [
    {
      title: "Title/Category",
      width: "5%",
      responsive: ["xs"],
      render: (record: ReprBaseItemRead) => (
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
        compare: (a: ReprBaseItemRead, b: ReprBaseItemRead) => a.category.localeCompare(b.category)
      },
      render: (record: ReprBaseItemRead) => renderCategory(record),
      onFilter: (value: string | number | boolean | bigint, record: ReprBaseItemRead) =>
        record.category?.startsWith(value.toString())
    },
    {
      title: "Location/Status",
      responsive: ["xs"],
      render: (record: ReprBaseItemRead) => (
        <Space.Compact direction="vertical">
          {renderLocation(record)}
          {renderStatus(record)}
        </Space.Compact>
      )
    },
    {
      title: "Location",
      dataIndex: "location",
      width: "5%",
      responsive: ["sm"],
      filters: buildLocationFilter(),
      render: (text: string, record: ReprBaseItemRead) => renderLocation(record),
      sorter: {
        compare: (a: ReprBaseItemRead, b: ReprBaseItemRead) =>
          a.location.title.localeCompare(b.location.title)
      },
      onFilter: (value: string | number | boolean | bigint, record: ReprBaseItemRead) =>
        record.location.id == value
    },
    {
      title: "Status",
      width: "5%",
      responsive: ["sm"],
      ellipsis: false,
      render: (record: ReprBaseItemRead) => renderStatus(record)
    },
    {
      title: "Expiration/TTL",
      responsive: ["xs"],
      render: (record: ReprBaseItemRead) => (
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
      render: (record: ReprBaseItemRead) => renderExpirationDate(record)
    },
    {
      title: "Time to live in days",
      responsive: ["sm"],
      render: (record: ReprBaseItemRead) => renderTtl(record),
      sorter: {
        compare: (a: ReprBaseItemRead, b: ReprBaseItemRead) => a.ttl - b.ttl
      }
    }
  ];

  const tablePagination = usePagination<ReprBaseItemRead>({
    name: "items-table",
    total: items?.count,
    pageSize: pageSize,
    setPage,
    setPageSize
  });

  return (
    <React.Fragment>
      <Space size="large" align="center" direction="horizontal">
        <ModalPopup message="Add Item">
          <ItemForm />
        </ModalPopup>
        <ModalPopup message="Add Location">
          <LocationForm />
        </ModalPopup>
        <ModalPopup message="Scan" handler={setUpc}>
          <Scanner />
        </ModalPopup>
        <Button onClick={() => setUpc("")} type="primary">
          <CloseCircleOutlined />
        </Button>
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
