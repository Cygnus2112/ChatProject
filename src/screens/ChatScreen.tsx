import React, { useState, useCallback } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

import ChatInput from '../components/ChatInput';
import ChatConversationList from '../components/ChatConversationList';

import { useChatGPT } from '../hooks/useChatGPT';

import { IChatMessage } from '../types/types';

const ChatScreen = () => {
  // Normally I'd use something more robust for handling state + side effects, like Redux Sagas,
  // but given the scope and timeframe of this project, I'm handling state locally
  const [messages, setMessages] = useState<IChatMessage[]>([]);
  const [chatInputContent, setChatInputContent] = useState('');
  const { answerText, loading, sendQuery, createdAt } = useChatGPT();

  const handleSendMessage = useCallback(() => {
    setMessages(prevMessages => {
      const queryToAdd: IChatMessage = {
        id: Date.now(),
        author: 'user',
        content: chatInputContent,
        createdAt: Date.now(),
      };
      if (answerText) {
        const answerToAdd: IChatMessage = {
          id: Date.now(),
          author: 'gpt',
          content: answerText,
          createdAt,
        };
        return [...prevMessages, answerToAdd, queryToAdd];
      }
      return [...prevMessages, queryToAdd];
    });
    sendQuery(chatInputContent);
    setChatInputContent('');
  }, [answerText, chatInputContent, createdAt, sendQuery]);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoiding}
        behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.contentContainer}>
          <ChatConversationList
            answerText={answerText}
            answerCreatedAt={createdAt}
            messages={messages}
            loading={loading}
          />
          <ChatInput
            disabled={!chatInputContent.length}
            chatContent={chatInputContent}
            onChangeChatContent={setChatInputContent}
            onSendMessage={handleSendMessage}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.90)',
    paddingBottom: 50,
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
  },
  keyboardAvoiding: {
    flex: 1,
    width: '100%',
    overflow: 'hidden',
  },
});

export default ChatScreen;
