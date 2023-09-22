import { FieldData } from "rc-field-form/lib/interface";

type ProgressArgs = {
  allFields: FieldData[];
  handler: (value: number) => void;
};

export function useProgress({ allFields, handler }: ProgressArgs): void {
  handler((allFields.filter((field) => field.value).length / allFields.length) * 100);
}
