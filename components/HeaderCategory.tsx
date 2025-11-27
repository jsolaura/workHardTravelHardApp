import theme from '@/constants/colors';
import CATEGORIES from '@/constants/Index';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface HeaderCategoryProps {
  category: keyof typeof CATEGORIES;
  onSaveCategory: (category: keyof typeof CATEGORIES) => void;
}

const HeaderCategory = ({ category, onSaveCategory }: HeaderCategoryProps) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => onSaveCategory('WORK')}>
        <Text style={{
          ...styles.buttonText, 
          color: category === 'WORK' 
            ? theme.colors.white 
            : theme.colors.brown 
          }}
        >
          Work
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSaveCategory('TRAVEL')}>
        <Text style={{
          ...styles.buttonText, 
          color: category === 'TRAVEL' 
            ? theme.colors.white 
            : theme.colors.brown 
          }}
        >
          Travel
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonText: {
    fontFamily: "Rubik-Bold",
    fontSize: 44,
    fontWeight: "500",
  },
});

export default HeaderCategory;