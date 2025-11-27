import theme from '@/constants/colors';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ProgressbarProps {
  completedCount: number;
  totalCount: number;
}

const Progressbar = ({ completedCount, totalCount }: ProgressbarProps) => {
  const progress = Math.round((completedCount / totalCount) * 100);
  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <View style={[styles.progress, { width: `${progress}%` }]} />
      </View>
      <Text style={styles.progressText}>{progress}%</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    borderWidth: 1,
  },
  progressContainer: {
    flex: 1,
    backgroundColor: theme.colors.white,
    height: 4,
    borderRadius: 10,
    transitionProperty: 'width',
    transitionDuration: '0.3s',
    transitionTimingFunction: 'ease-in-out',
  },
  progress: {
    height: '100%',
    backgroundColor: theme.colors.green,
    borderRadius: 10,
    flex: 1,
    transitionProperty: 'width',
    transitionDuration: '0.3s',
    transitionTimingFunction: 'ease-in-out',
  },
  progressText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default Progressbar