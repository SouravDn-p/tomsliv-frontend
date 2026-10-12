import { ChangeEvent } from "react";

export type JobCheckboxProps = {
  label: string;
  count: number;
  value: string;
  checked?: boolean;
  onChange?: (value: string, checked: boolean) => void;
  group?: string;
};

function JobCheckbox({
  label,
  value,
  checked = false,
  onChange,
}: JobCheckboxProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange?.(value, e.target.checked);
    }
  };

  return (
    <label className="flex items-center gap-4 text-gray-600 cursor-pointer ml-3 mb-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        value={value}
        className="h-4 w-4 rounded border-gray-400 text-blue-600 accent-primary-blue focus:ring-blue-500 cursor-pointer"
      />
      <span className="flex-1">{label}</span>
      {/* <span className="text-sm text-gray-500">({count})</span> */}
    </label>
  );
}

export default JobCheckbox;
