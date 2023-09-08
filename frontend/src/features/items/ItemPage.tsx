import React from "react"
import {
  useGetItemsChoicesQuery,
  useGetItemsQuery,
  useUpdateItemMutation,
} from "../../app/api"
import { MinusCircleTwoTone, PlusCircleTwoTone } from "@ant-design/icons"
import { Table, Button, Space, Spin, DatePicker } from "antd"
import * as dayjs from "dayjs"
import _ from "lodash"

export default function ItemPage() {
  const { data, isLoading } = useGetItemsQuery()
  const { data: choices } = useGetItemsChoicesQuery()
  const [updateItem] = useUpdateItemMutation()
  const buildFilter = (value: string) => {
    const fieldChoices: Array<{
      text: string | number | boolean
      value: string | number | boolean
    }> = []
    if (choices) {
      const fieldChoice = _.find(choices, { field: value })
      fieldChoice?.values.map((item: string | number | boolean) => {
        fieldChoices.push({
          text: String(item)[0] + String(item).slice(1).toLowerCase(),
          value: item,
        })
      })
    } else {
      return []
    }
    return fieldChoices
  }
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      width: "30%",
    },
    {
      title: "Category",
      dataIndex: "category",
      width: "5%",
      filters: buildFilter("category"),
      sorter: {
        compare: (a: BaseItem, b: BaseItem) =>
          a.category.localeCompare(b.category),
      },
      onFilter: (value: string | number | boolean, record: BaseItem) =>
        record.category.startsWith(value.toString()),
    },
    {
      title: "Location",
      dataIndex: "location",
      width: "5%",
      filters: [
        {
          text: "Goods",
          value: 1,
        },
        {
          text: "Medications",
          value: 2,
        },
      ],
      render: (text: string, record: BaseItem) => (
        <React.Fragment>{record.location.title}</React.Fragment>
      ),
      sorter: {
        compare: (a: BaseItem, b: BaseItem) =>
          a.location.title.localeCompare(b.location.title),
      },
      onFilter: (value: string | number | boolean, record: BaseItem) =>
        record.location.id == value,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      width: "5%",
      sorter: {
        compare: (a: BaseItem, b: BaseItem) => a.quantity - b.quantity,
      },
      render: (text: string, record: BaseItem) => (
        <>
          <Space>
            <Button
              type="primary"
              onClick={() =>
                updateItem({ id: record.id, quantity: record.quantity - 1 })
              }
            >
              <MinusCircleTwoTone />
            </Button>
            {text}
            <Button
              type="primary"
              onClick={() =>
                updateItem({ id: record.id, quantity: record.quantity + 1 })
              }
            >
              <PlusCircleTwoTone />
            </Button>
          </Space>
        </>
      ),
    },

    {
      title: "Expiration",
      dataIndex: "expiration_date",
      width: "40%",
      render: (text: string, record: BaseItem) => (
        <React.Fragment>
          <DatePicker
            defaultValue={dayjs(text)}
            onChange={(date, dateString) => {
              if (date) {
                updateItem({ id: record.id, expiration_date: dateString })
              }
            }}
          />
        </React.Fragment>
      ),
    },
    {
      title: "Time to live in days",
      dataIndex: "ttl",
      sorter: {
        compare: (a: BaseItem, b: BaseItem) => a.ttl - b.ttl,
      },
    },
  ]

  return (
    <React.Fragment>
      {isLoading ? (
        <Spin size="large"></Spin>
      ) : (
        <Table columns={columns} dataSource={data?.results} rowKey="id" />
      )}
    </React.Fragment>
  )
}
