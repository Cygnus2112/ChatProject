import React, { useCallback, useMemo, useRef, useEffect } from 'react';
import { StyleSheet, View, ListRenderItemInfo, FlatList } from 'react-native';

import ChatMessage from './ChatMessage';

import { IChatMessage } from '../types/types';

type IProps = {
  answerText: string;
  answerCreatedAt?: number;
  messages: IChatMessage[];
  loading: boolean;
};

export const ChatConversationList = ({
  answerText,
  answerCreatedAt,
  messages,
  loading,
}: IProps) => {
  const ref = useRef(null); // TODO: typing

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<IChatMessage>) => {
      const { id, author, content, createdAt, loading: answerLoading } = item;
      const isUser = author === 'user';
      return (
        <ChatMessage
          key={id}
          isUser={isUser}
          content={content}
          createdAt={createdAt}
          loading={answerLoading}
        />
      );
    },
    []
  );

  const messagesToDisplay: IChatMessage[] = useMemo(() => {
    const answerToDisplay: IChatMessage = {
      id: Date.now(),
      content: answerText,
      author: 'gpt',
      createdAt: answerCreatedAt,
      loading,
    };
    return [...messages, answerToDisplay];
  }, [answerCreatedAt, answerText, messages, loading]);

  useEffect(() => {
    setTimeout(() => {
      ref.current?.scrollToEnd();
    }, 100);
  }, [answerText, messagesToDisplay.length]);

  return (
    <View style={styles.container}>
      <FlatList
        ref={ref}
        style={styles.flatlist}
        data={messagesToDisplay}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainer}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  flatlist: {
    flex: 1,
    width: '100%',
    left: 0,
    paddingBottom: 20,
  },
  contentContainer: {
    paddingTop: 8,
  },
});

export default ChatConversationList;
