import { FieldData } from "rc-field-form/lib/interface";

type ProgressArgs = {
  allFields: FieldData[];
  handler: (value: number) => void;
};

export function getProgress({ allFields, handler }: ProgressArgs): void {
  handler(Math.ceil((allFields.filter((field) => field.value).length / allFields.length) * 100));
}
