import { useState } from "react";

export const useTodoSelection = (list: string[]) => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const toggleSelect = (id: string) => {
    setSelectedKeys((prev) => 
      prev.includes(id)
      ? prev.filter((key) => key !== id)
      : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedKeys.length === list.length) {
    setSelectedKeys([]);
    } else {
      setSelectedKeys(list);
    }
  };

  const isSelected = (id: string) => selectedKeys.includes(id);

  return {
    selectedKeys,
    toggleSelect,
    toggleSelectAll,
    isSelected,
  };
};