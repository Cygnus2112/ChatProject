import React, { useCallback, useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Collapsible from 'react-native-collapsible';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import avatars from '../components/avatars';

import Assistant from '../components/Assistant';
import TaskList from '../components/TaskList';

import { ITask } from '../types/types';

// Temporary data for Tasks section
const tasks: ITask[] = [
  {
    title: 'Re: apps sales strategy',
    subtitle: 'Hi Josh, Kirk has not yet responded...',
    avatarUri: avatars.avatar2,
  },
  {
    title: 'Annual Report Meeting',
    subtitle: "Great, I'll put a whole day block on",
    avatarUri: avatars.avatar3,
  },
  {
    title: 'Coordinate a 30 minute chat',
    subtitle: "Great, I'll put a whole day block on",
    avatarUri: avatars.avatar4,
  },
  {
    title: 'Task #31',
    subtitle: "Hi Josh, I'll get started to set up the...",
    avatarUri: avatars.avatar1,
  },
];

const HomeScreen = () => {
  const [expanded, setExpanded] = useState(false);
  const navigation = useNavigation();
  const offset = useSharedValue(90);

  const handlePress = useCallback(() => {
    navigation.navigate('Chat' as never);
  }, [navigation]);

  const handleExpand = useCallback(() => {
    setExpanded(prevState => {
      offset.value = withTiming(-offset.value, { duration: 300 });

      return !prevState;
    });
  }, [offset]);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ rotate: offset.value + 'deg' }],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.assistantHeader}>
        <Text style={styles.headerText}>Your Assistant</Text>
      </View>
      <Assistant onPress={handlePress} />
      <View style={styles.tasksHeader}>
        <Text style={styles.headerText}>{tasks.length} Tasks</Text>
        <Animated.View style={[styles.button, animatedStyles]}>
          <Pressable onPress={handleExpand}>
            <Text style={styles.arrow}>&rsaquo;</Text>
          </Pressable>
        </Animated.View>
      </View>
      <Collapsible collapsed={!expanded}>
        <TaskList tasks={tasks} />
      </Collapsible>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgba(0, 0, 0, 0.90)',
  },
  assistantHeader: {
    paddingVertical: 15,
    paddingLeft: 15,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
  },
  tasksHeader: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    transform: [{ rotate: '90deg' }],
  },
  arrow: {
    color: 'white',
    fontSize: 48,
    lineHeight: 48,
  },
});

export default HomeScreen;
