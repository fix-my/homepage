import { memo } from "react";

const SelectableButton = memo(function SelectableButton({
  label,
  isSelected,
  onClick,
}: {
  label: string;
  isSelected: boolean;
  onClick: (item: string) => void;
}) {
  console.log(`${label} 버튼 리렌더!`);

  return (
    <button
      onClick={() => onClick(label)}
      className={`px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 ${
        isSelected
          ? "bg-purple-500 text-white shadow-lg"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
    >
      {label}
    </button>
  );
});

export default SelectableButton;
