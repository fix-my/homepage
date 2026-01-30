import { useState } from "react";
import SelectableButton from "./components/SelectableButton";

const items = ["사과", "바나나", "체리", "딸기", "포도"];

export default function App() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

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
              onClick={() => setSelectedItem(item)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
