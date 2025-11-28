import HeaderCategory from "@/components/HeaderCategory";
import Progressbar from "@/components/Progressbar";
import Search from "@/components/Search";
import SelectedTodoActions from "@/components/SelectedTodoActions";
import TodoItem from "@/components/TodoItem";
import theme from "@/constants/colors";
import { useTodoCategory } from "@/hooks/useTodoCategory";
import { useTodos } from "@/hooks/useTodos";
import { useTodoScroll } from "@/hooks/useTodoScroll";
import { useTodoSelection } from "@/hooks/useTodoSelection";
import { useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { category, onSaveCategory } = useTodoCategory();

  const [text, setText] = useState("");

  const { 
    toDos, 
    order, 
    addToDo, 
    updateToDoText, 
    toggleCompletedToDo, 
    deleteToDo,
    deleteSelectedToDos,
    reorder,
  } = useTodos();
  const currentTodoList = order[category].filter(id => !!toDos[id]);

  const { 
    selectedKeys, 
    toggleSelect, 
    toggleSelectAll, 
    isSelected
  } = useTodoSelection(currentTodoList.filter((id) => !toDos[id].completed));

  const listRef = useRef<any>(null);
  const { scrollToItem } = useTodoScroll(listRef);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <DraggableFlatList
          ref={listRef}
          data={currentTodoList}
          keyExtractor={(item) => item}
          onDragEnd={({ data }) => reorder(data, category)}
          ListHeaderComponent={(
            <View style={{ gap: 20, marginBottom: 20 }}>
              <HeaderCategory 
                category={category} 
                onSaveCategory={onSaveCategory} 
              />
              <Search
                category={category}
                setText={setText}
                text={text}
                addToDo={() => addToDo(text, category)}
              />
              {currentTodoList.length > 0 && 
                <Progressbar 
                  completedCount={currentTodoList.filter((key) => toDos[key].completed).length} 
                  totalCount={currentTodoList.length} 
                />
              }
              {currentTodoList.length > 1 && 
                <SelectedTodoActions 
                  toggleSelectAll={toggleSelectAll}
                  deleteSelectedToDos={() => deleteSelectedToDos(selectedKeys, category)}
                  selectedKeys={selectedKeys as string[]}
                />
              }
            </View>
          )}
          renderItem={({ item: key, drag, isActive, getIndex }) => (
            <TodoItem 
              id={key}
              toDo={toDos[key]}
              toggleSelect={toggleSelect}
              toggleCompletedToDo={toggleCompletedToDo}
              deleteToDo={() => deleteToDo(key, category)}
              isSelected={isSelected}
              updateToDoText={updateToDoText}
              onLongPress={drag}
              isDragging={isActive}
              onFocusInput={() => scrollToItem(getIndex?.() ?? 0) }
            />
          )}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundColor,
    paddingHorizontal: 20,
    gap: 20,
  },
});