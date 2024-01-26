import React, { useCallback } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';

import TaskItem from './TaskItem';

import { ITask } from '../types/types';

type IProps = {
  tasks: ITask[];
};

const TaskList = ({ tasks }: IProps) => {
  const renderItem = useCallback(({ item }: ListRenderItemInfo<ITask>) => {
    const { title, subtitle, avatarUri } = item;
    return <TaskItem title={title} subtitle={subtitle} avatarUri={avatarUri} />;
  }, []);

  return (
    <FlatList
      data={tasks}
      renderItem={renderItem}
      keyExtractor={(_, index: number) => index.toString()}
    />
  );
};

export default TaskList;
