import { CATEGORIES, STORAGE_KEY } from "@/constants/Index";
import { Category, ToDo } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export const useTodos = () => {
  const [toDos, setToDos] = useState<Record<string, ToDo>>({});
  const [order, setOrder] = useState<Record<Category, string[]>>({
    WORK: [],
    TRAVEL: []
  });

  useEffect(() => {
    loadTodos();
  }, []);
  
  /** ----------------------------
   * Load & Save
  --------------------------------*/

  const loadTodos = async () => {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if(!stored) return;

    const parsed = JSON.parse(stored);
    
    if(parsed.toDos) setToDos(parsed.toDos);
    if(parsed.order) setOrder(parsed.order);
  }

  const saveTodos = async (
    updatedTodos: Record<string, ToDo>, 
    updatedOrder: Record<Category, string[]>
  ) => {
    await AsyncStorage.setItem(
      STORAGE_KEY, 
      JSON.stringify({
        toDos: updatedTodos,
        order: updatedOrder
      })
    );
  }

  /** ----------------------------
   * CRUD + Order
  --------------------------------*/

  const addToDo = async (text: string, category: Category) => {
    if (!text.trim()) return; 

    const id = Date.now().toString();
  
    const newTodos = {
      ...toDos,
      [id]: { text, category, completed: false },
    };

    const newOrder = {
      ...order,
      [category]: [...order[category], id],
    };

    setToDos(newTodos);
    setOrder(newOrder);
    await saveTodos(newTodos, newOrder);
  }

  const updateToDoText = async (id: string, newText: string) => {
    const newTodos = {
      ...toDos,
      [id]: { ...toDos[id], text: newText },
    };

    setToDos(newTodos);
    await saveTodos(newTodos, order);
  };
  
  const toggleCompletedToDo = async (id: string) => {
    const newTodos = {
      ...toDos,
      [id]: { ...toDos[id], completed: !toDos[id].completed },
    };

    setToDos(newTodos);
    await saveTodos(newTodos, order);
  };

  const deleteToDo = async (id: string, category: Category) => {
    const newTodos = { ...toDos };
    delete newTodos[id];

    const newOrder = {
      ...order,
      [category]: order[category].filter((v) => v !== id),
    };

    setToDos(newTodos);
    setOrder(newOrder);

    await saveTodos(newTodos, newOrder);
  };

  const deleteSelectedToDos = async (selectedKeys: string[], category: Category) => {
    if(selectedKeys.length === 0) return;

    Alert.alert(
      "선택한 항목 지우기", 
      CATEGORIES[category].deleteAllConfirmText, 
      [
        { text: "취소", style: "cancel" },
        { 
          text: "확인", 
          style: "destructive", 
          onPress: async () => {
            const newTodos = { ...toDos };
            selectedKeys.forEach((id) => delete newTodos[id]);

            const newOrder = {
              ...order,
              [category]: order[category].filter((id) => !selectedKeys.includes(id))
            };

            setToDos(newTodos);
            setOrder(newOrder);
            await saveTodos(newTodos, newOrder);
          }
        },
      ]
    );
  }

  /** ----------------------------
   * Drag & Drop
  --------------------------------*/

  const reorder = async (list: string[], category: Category) => {
    const newOrder = {
      ...order,
      [category]: list,
    };

    setOrder(newOrder);
    await saveTodos(toDos, newOrder);
  };

  return {
    toDos,
    order,
    loadTodos,
    addToDo,
    updateToDoText,
    toggleCompletedToDo,
    deleteToDo,
    deleteSelectedToDos,
    reorder,
  };
};