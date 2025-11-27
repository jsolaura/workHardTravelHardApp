import { useState } from "react";

type KeyExtractor<T> = (item: T) => string | number;

export const useSelection = <T>(
  items: T[],
  keyExtractor?: KeyExtractor<T>
) => {
  const getKey = (item: T): string | number => {
    if (keyExtractor) {
      return keyExtractor(item);
    }
    // keyExtractor가 없으면 item 자체가 키인 경우 (string | number)
    return item as unknown as string | number;
  };

  const [selectedKeys, setSelectedKeys] = useState<(string | number)[]>([]);

  const toggleSelect = (item: T) => {
    const key = getKey(item);
    if (selectedKeys.includes(key)) {
      setSelectedKeys(selectedKeys.filter((k) => k !== key));
    } else {
      setSelectedKeys([...selectedKeys, key]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedKeys.length === items.length) {
      setSelectedKeys([]);
    } else {
      setSelectedKeys(items.map(getKey));
    }
  };

  const isSelected = (item: T): boolean => {
    return selectedKeys.includes(getKey(item));
  };

  return {
    selectedKeys,
    selectedItems: items.filter((item) => isSelected(item)),
    toggleSelect,
    toggleSelectAll,
    isSelected,
    setSelectedKeys,
  };
};

