import theme from '@/constants/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface SelectedTodoActionsProps {
  toggleSelectAll: () => void;
  deleteSelectedToDos: () => void;
  selectedKeys: string[];
}

const SelectedTodoActions = ({ 
  toggleSelectAll, 
  deleteSelectedToDos, 
  selectedKeys 
}: SelectedTodoActionsProps) => {
  return (
    <View style={styles.toDoTopActions}>
      <TouchableOpacity 
        style={styles.toDoActionButton}
        onPress={toggleSelectAll}
      >
        <MaterialCommunityIcons 
          name="checkbox-multiple-marked"
          size={20}
        />
      </TouchableOpacity>
      <TouchableOpacity 
        style={{ 
          ...styles.toDoActionButton, 
          opacity: selectedKeys.length === 0 ? 0.8 : 1 
        }}
        onPress={deleteSelectedToDos}
        disabled={selectedKeys.length === 0}
      >
        <MaterialCommunityIcons 
          name="delete-sweep"
          size={20}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  toDoTopActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  toDoActionButton: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: theme.colors.white,
  },
});

export default SelectedTodoActions