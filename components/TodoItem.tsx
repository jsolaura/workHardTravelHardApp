import theme from '@/constants/colors';
import { ToDo } from '@/types';
import { AntDesign, Fontisto, Octicons } from '@expo/vector-icons';
import { Checkbox } from 'expo-checkbox';
import { Platform, Pressable, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

interface TodoItemProps {
  id: string;
  toDo: ToDo;
  toggleSelect: (id: string) => void;
  toggleCompletedToDo: (id: string) => void;
  deleteToDo: (id: string) => void;
  isSelected: (id: string) => boolean;
  updateToDoText: (id: string, text: string) => void;
}

const TodoItem = ({ 
  id, 
  toDo, 
  toggleSelect, 
  toggleCompletedToDo, 
  deleteToDo, 
  isSelected,
  updateToDoText
}: TodoItemProps) => {
  const isCompleted = toDo.completed;
  return (
    <View key={id} style={styles.toDoItemContainer}>
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
          backgroundColor: isCompleted ? theme.colors.lightGray : theme.colors.brown,
          paddingVertical: Platform.OS === 'android' ? 10 : 16,
        }}
      >
        <TextInput 
          style={{
            ...styles.toDoText,
            textDecorationLine: isCompleted ? "line-through" : "none",
            color: isCompleted ? theme.colors.gray : theme.colors.white,
            lineHeight: Platform.OS === 'android' ? 16 : undefined,
          }}
          value={toDo.text}
          editable={!isCompleted}
          onChangeText={(text) => !isCompleted && updateToDoText(id, text)}
        />
        <View style={styles.toDoActions}>
          <TouchableOpacity onPress={() => toggleCompletedToDo(id)}>
            {isCompleted ? (
              <AntDesign name="rollback" size={20} color={theme.colors.gray} /> 
              ) : (
                <Octicons name="tracked-by-closed-completed" size={20} color={theme.colors.gray} />
              )
            }
          </TouchableOpacity>
          {!isCompleted && 
            <TouchableOpacity onPress={() => deleteToDo(id)}>
              <Fontisto name="trash" size={18} color={theme.colors.gray} />
            </TouchableOpacity>
          }
        </View>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  toDoItemContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  toDo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.colors.brown,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  toDoLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  toDoText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: "500",
    padding: 0,
  },
  toDoActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  checkbox: {
    width: 18,
    height: 18,
  },
});

export default TodoItem