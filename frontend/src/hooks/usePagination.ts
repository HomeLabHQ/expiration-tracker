import type { TablePaginationConfig } from "antd";

import { useEffect, useMemo, useState } from "react";

type PaginationArg<T> = {
  pageSize: number;
  name: string;
  total?: number;
  obj?: T[];
  setPageSize?: (size: number) => void;
  setPage?: (page: number) => void;
};

export function usePagination<T>({
  name,
  total,
  pageSize,
  obj,
  setPageSize,
  setPage
}: PaginationArg<T>): TablePaginationConfig {
  const keyName = useMemo(() => (name ? `expiration-tracker-${name}-pagination` : undefined), []);
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    if (keyName) {
      const value = localStorage.getItem(keyName);
      if (value) {
        const pagObj = value.split("/");
        if (pagObj.length === 2) {
          try {
            setCurrent(parseInt(pagObj[0], 10));
            setPageSize?.(parseInt(pagObj[1], 10));
          } catch {
            setCurrent(1);
            setPageSize?.(parseInt(pagObj[1], 10));
            localStorage.removeItem(keyName);
          }
        } else {
          localStorage.removeItem(keyName);
        }
      }
    }
  }, [keyName]);

  return useMemo<TablePaginationConfig>(() => {
    setPageSize?.(pageSize);
    setPage?.(current);

    return {
      defaultCurrent: current,
      defaultPageSize: pageSize,
      total: obj?.length ?? total,
      pageSize: pageSize,
      current: current,
      disabled: false,
      showQuickJumper: true,
      showSizeChanger: true,
      hideOnSinglePage: false,
      pageSizeOptions: [10, 20, 50, 100, 200, 500],
      position: ["bottomRight"],
      responsive: true,
      onChange(page: number, size: number) {
        setCurrent(page);
        setPageSize?.(size);
        setPage?.(page);
        if (keyName) {
          localStorage.setItem(keyName, `${page}/${size}`);
        }
      }
    };
  }, [setPageSize, pageSize, setPage, current, obj?.length, total, keyName]);
}
