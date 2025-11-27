import CATEGORIES from '@/constants/Index';
import theme from '@/constants/colors';
import { StyleSheet, TextInput } from 'react-native';

interface SearchProps {
  category: keyof typeof CATEGORIES;
  setText: (text: string) => void;
  text: string;
  addToDo: () => void;
}

const Search = ({ 
  category, 
  setText, 
  text, 
  addToDo
}: SearchProps) => {
  return (
    <TextInput 
      style={styles.input}
      placeholder={CATEGORIES[category].placeholder}
      onChangeText={(text: string) => setText(text)}
      value={text}
      onSubmitEditing={addToDo}
      returnKeyType="done"
    />
  )
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: theme.colors.white,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    fontSize: 18,
    // fontFamily: "Rubik-Regular",
  },
});

export default Search