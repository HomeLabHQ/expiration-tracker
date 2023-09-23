import { Select } from "antd";
import { useItemsChoicesRetrieveQuery } from "../../redux/api";
import _ from "lodash";
export default function ItemEnumSelector(field: string) {
  const { data: choices } = useItemsChoicesRetrieveQuery();
  const Enum = _.find(choices, { field: field });
  if (!Enum) {
    return [];
  }
  return Enum.values.map((item, index) => {
    return (
      <Select.Option key={index} value={item}>
        {item}
      </Select.Option>
    );
  });
}
