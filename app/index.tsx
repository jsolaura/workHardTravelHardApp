import HeaderCategory from "@/components/HeaderCategory";
import Progressbar from "@/components/Progressbar";
import Search from "@/components/Search";
import SelectedTodoActions from "@/components/SelectedTodoActions";
import TodoItem from "@/components/TodoItem";
import theme from "@/constants/colors";
import CATEGORIES from "@/constants/Index";
import { useSelection } from "@/hooks/useSelection";
import { ToDo } from "@/types";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useMemo, useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const STORAGE_KEY = "@toDos";
const CATEGORY_STORAGE_KEY = "@category";

export default function Index() {
  const [category, setCategory] = useState<keyof typeof CATEGORIES>('WORK');

  const [text, setText] = useState("");
  const [toDos, setToDos] = useState<Record<string, ToDo>>({});

  const currentTodoList = useMemo(() => 
    Object.keys(toDos)
      .filter((key) => toDos[key].category === category), 
  [toDos, category]);

  const { 
    selectedKeys, 
    toggleSelect, 
    toggleSelectAll, 
    isSelected
  } = useSelection(currentTodoList.filter((key) => !toDos[key].completed));

  useEffect(() => {
    loadTodos();
  }, []);

  const onSaveCategory = async (type: keyof typeof CATEGORIES) => {
    await AsyncStorage.setItem(CATEGORY_STORAGE_KEY, type);
    setCategory(type);
  }

  const loadTodos = async () => {
    const todos = await AsyncStorage.getItem(STORAGE_KEY);
    const category = await AsyncStorage.getItem(CATEGORY_STORAGE_KEY);
    if (todos) {
      setToDos(JSON.parse(todos));
    }
    if (category) {
      setCategory(category as keyof typeof CATEGORIES);
    }
  }

  const addToDo = async () => {
    const newTodos = {
      ...toDos,
      [Date.now()]: { text, category, completed: false }
    }
    setToDos(newTodos);
    await saveTodos(newTodos);
    setText("");
  }

  const saveTodos = async (toSave: Record<string, ToDo>) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  }

  const toggleCompletedToDo = async (key: string) => {
    const newTodos = { ...toDos };
    newTodos[key].completed = !newTodos[key].completed;
    setToDos(newTodos);
    await saveTodos(newTodos);
  }

  const deleteToDo = async (key: string) => {
    Alert.alert(
      "삭제", 
      "정말 삭제하시겠습니까?", 
      [
        { text: "취소", style: "cancel" },
        { text: "확인", onPress: () => {
          const newTodos = { ...toDos };
          delete newTodos[key];
          setToDos(newTodos);
          saveTodos(newTodos);
        }},
      ]
    );
  }

  const deleteSelectedToDos = async () => {
    if(selectedKeys.length === 0) {
      return;
    }
    Alert.alert(
      "선택한 항목 지우기", 
      CATEGORIES[category].deleteAllConfirmText, 
      [
        { text: "취소", style: "cancel" },
        { text: "확인", style: "destructive", onPress: () => {
          const newTodos = { ...toDos };
          selectedKeys.forEach((key) => {
            delete newTodos[key as string];
          });
          setToDos(newTodos);
          saveTodos(newTodos);
        }},
      ]
    );
  }

  const updateToDoText = async (id: string, text: string) => {
    const newTodos = { ...toDos };
    newTodos[id].text = text;
    setToDos(newTodos);
    await saveTodos(newTodos);
  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderCategory 
        category={category} 
        onSaveCategory={onSaveCategory} 
      />
      <Search
        category={category}
        setText={setText}
        text={text}
        addToDo={addToDo}
      />
      {currentTodoList.length > 0 && 
        <Progressbar 
          completedCount={currentTodoList.filter((key) => toDos[key].completed).length} 
          totalCount={currentTodoList.length} 
        />
      }
      <ScrollView contentContainerStyle={styles.toDosContainer}>
        {currentTodoList.length > 1 && 
          <SelectedTodoActions 
            toggleSelectAll={toggleSelectAll}
            deleteSelectedToDos={deleteSelectedToDos}
            selectedKeys={selectedKeys as string[]}
          />
        }
        <View style={{ gap: 8 }}>
          {currentTodoList.map((key) => (
            <TodoItem 
              key={key}
              id={key}
              toDo={toDos[key]}
              toggleSelect={toggleSelect}
              toggleCompletedToDo={toggleCompletedToDo}
              deleteToDo={deleteToDo}
              isSelected={isSelected}
              updateToDoText={updateToDoText}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundColor,
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 20,
  },
  toDosContainer: {
    gap: 8,
  },
});