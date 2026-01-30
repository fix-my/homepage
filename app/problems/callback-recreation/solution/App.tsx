import { useState, useCallback } from "react";
import SelectableButton from "./components/SelectableButton";

const items = ["사과", "바나나", "체리", "딸기", "포도"];

export default function App() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  // ✅ useCallback으로 함수를 메모이제이션
  const handleSelect = useCallback((item: string) => {
    setSelectedItem(item);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">
          과일 선택
        </h1>
        <p className="text-center mb-6 text-gray-600">
          선택된 과일:{" "}
          <span className="font-semibold text-purple-600">
            {selectedItem || "없음"}
          </span>
        </p>

        <div className="flex gap-3 flex-wrap justify-center">
          {items.map((item) => (
            <SelectableButton
              key={item}
              label={item}
              isSelected={selectedItem === item}
              onClick={handleSelect}
            />
          ))}
        </div>

        <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-gray-700">
            ✅ <strong>해결:</strong> useCallback으로 핸들러를 메모이제이션하고,
            모든 버튼에 동일한 함수 참조를 전달합니다.
            SelectableButton 내부에서 label을 전달하여 어떤 항목이 클릭되었는지 알립니다.
          </p>
        </div>
      </div>
    </div>
  );
}
