"use client";

type CheckboxGroupProps = {
  options: readonly string[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  columns?: number;
};

export default function CheckboxGroup({
  options,
  selectedValues,
  onChange,
  columns = 2,
}: CheckboxGroupProps) {
  const handleCheckboxChange = (option: string, checked: boolean) => {
    if (checked) {
      onChange([...selectedValues, option]);
    } else {
      onChange(selectedValues.filter(value => value !== option));
    }
  };

  return (
    <div className={`grid grid-cols-${columns} gap-2 mt-3`}>
      {options.map((option) => (
        <label
          key={option}
          className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-50 transition"
        >
          <input
            type="checkbox"
            checked={selectedValues.includes(option)}
            onChange={(e) => handleCheckboxChange(option, e.target.checked)}
            className="h-4 w-4 cursor-pointer accent-[#1D4350]"
          />
          <span className="text-sm text-gray-700 capitalize">{option}</span>
        </label>
      ))}
    </div>
  );
}
