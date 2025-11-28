import theme from '@/constants/colors';
import { ToDo } from '@/types';
import { AntDesign, Fontisto, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import { Checkbox } from 'expo-checkbox';
import { useRef, useState } from 'react';
import { Platform, Pressable, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

interface TodoItemProps {
  id: string;
  toDo: ToDo;
  toggleSelect: (id: string) => void;
  toggleCompletedToDo: (id: string) => void;
  deleteToDo: (id: string) => void;
  isSelected: (id: string) => boolean;
  updateToDoText: (id: string, text: string) => void;
  onLongPress: () => void;
  isDragging: boolean;
  onFocusInput: () => void;
}

const TodoItem = ({ 
  id, 
  toDo, 
  toggleSelect, 
  toggleCompletedToDo, 
  deleteToDo, 
  isSelected,
  updateToDoText,
  onLongPress,
  isDragging,
  onFocusInput
}: TodoItemProps) => {

  const isCompleted = toDo.completed;
  const [isFocused, setIsFocused] = useState(false);
  const [selection, setSelection] = useState<{ start: number; end: number } | undefined>(undefined);
  
  const textInputRef = useRef<TextInput>(null);

  const handleFocus = () => {
    setIsFocused(true);
    onFocusInput();
  };

  const handleBlur = () => {
    setIsFocused(false);
    setSelection(undefined);
  };

  return (
    <Pressable 
      key={id} 
      style={[
        styles.toDoItemContainer,
        isDragging && { opacity: 0.5 }
      ]}
      onLongPress={onLongPress}
    >
      <Pressable 
        onPress={() => !isCompleted && toggleSelect(id)}
        style={styles.toDoLeft}
      >
        <Checkbox 
          value={isSelected(id)} 
          onValueChange={() => !isCompleted && toggleSelect(id)} 
          color={theme.colors.skyBlue} 
          style={{ ...styles.checkbox, opacity: isCompleted ? 0.3 : 1 }}
          disabled={isCompleted}
        />
      </Pressable>
      <View 
        style={{
          ...styles.toDo,
          backgroundColor: isCompleted 
            ? theme.colors.lightGray 
            : isFocused 
              ? theme.colors.white 
              : theme.colors.brown,
          paddingVertical: Platform.OS === 'android' ? 10 : 16,
          elevation: isFocused ? 5 : 0,
        }}
      >
        {!isFocused && 
        <Pressable onLongPress={onLongPress}>
          <MaterialCommunityIcons 
            name="drag"
            size={24}
            color={theme.colors.gray}
          />
        </Pressable>
        }
        <TextInput
          ref={textInputRef}
          style={{
            ...styles.toDoText,
            textDecorationLine: isCompleted ? "line-through" :  "none",
            color: isCompleted 
              ? theme.colors.gray 
              : isFocused
                ? theme.colors.black 
                : theme.colors.white,
            lineHeight: Platform.OS === 'android' ? 16 : undefined,
          }}
          value={toDo.text}
          editable={!isCompleted}
          onChangeText={(text) => !isCompleted && !isDragging && updateToDoText(id, text)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          selection={selection}
        />
        {!isFocused && 
          <View style={styles.toDoActions}>
            <TouchableOpacity onPress={() => toggleCompletedToDo(id)}>
              {isCompleted ? (
                <AntDesign name="rollback" size={24} color={theme.colors.gray} /> 
                ) : (
                  <Octicons name="tracked-by-closed-completed" size={24} color={theme.colors.gray} />
                )
              }
            </TouchableOpacity>
            {!isCompleted && 
              <TouchableOpacity onPress={() => deleteToDo(id)}>
                <Fontisto name="trash" size={18} color={theme.colors.gray} />
              </TouchableOpacity>
            }
          </View>
        }
      </View>
    </Pressable>
  )
}


const styles = StyleSheet.create({
  toDoItemContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    marginBottom: 12,
  },
  toDo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.colors.brown,
    paddingLeft: 10,
    paddingRight: 20,
    borderRadius: 15,
    gap: 10,
    height: 56,
  },
  toDoLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  toDoText: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    padding: 0,
  },
  toDoActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  checkbox: {
    width: 18,
    height: 18,
  },
});

export default TodoItem