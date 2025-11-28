import { CATEGORY_STORAGE_KEY } from "@/constants/Index";
import { Category } from "@/types";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";

export const useTodoCategory = () => {
  const [category, setCategory] = useState<Category>('WORK');

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = async () => {
    const saved = await AsyncStorage.getItem('category');
    if (saved) setCategory(saved as Category);
  }

  const onSaveCategory = async (type: Category) => {
    await AsyncStorage.setItem(CATEGORY_STORAGE_KEY, type);
    setCategory(type);
  }

  return {
    category,
    loadCategory,
    onSaveCategory,
  };
};