import React, { useMemo } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Loading from './Loading';
import { IChatMessage } from '../types/types';

const USER_BACKGROUND_COLOR = '#4682B4';
const GPT_BACKGROUND_COLOR = '#FFFFFF';
const USER_TEXT_COLOR = '#FFFFFF';
const GPT_TEXT_COLOR = '#000000';

type IProps = {
  isUser: boolean;
  content: IChatMessage['content'];
  createdAt?: number;
  loading?: boolean;
};

const ChatMessage = ({ isUser, content, createdAt, loading }: IProps) => {
  const containerStyles = useMemo(
    () => (isUser ? styles.userContainer : styles.gptContainer),
    [isUser]
  );
  const borderStyle = useMemo(() => {
    return {
      borderTopLeftRadius: isUser ? 18 : 0,
      borderTopRightRadius: isUser ? 0 : 18,
    };
  }, [isUser]);
  const textBubbleStyles = useMemo(() => {
    if (isUser) {
      return [styles.userTextBubble, borderStyle];
    }
    return [styles.gptTextBubble, borderStyle];
  }, [borderStyle, isUser]);
  const textStyles = useMemo(
    () => (isUser ? styles.userText : styles.gptText),
    [isUser]
  );
  const timeStamp = useMemo(() => {
    if (createdAt) {
      return new Date(createdAt).toLocaleTimeString();
    }
  }, [createdAt]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Loading />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!isUser && (
        <View style={styles.gptPadding}>
          <Text style={styles.gptTextColor}>Steph</Text>
        </View>
      )}
      <View style={styles.innerContainer}>
        <View style={containerStyles}>
          <View style={textBubbleStyles}>
            <Text style={textStyles}>{content}</Text>
            <Text style={[textStyles, styles.timestamp]}>{timeStamp}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
    marginBottom: 10,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  gptContainer: {
    flex: 1,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingRight: 48,
    paddingLeft: 5,
  },
  userContainer: {
    flex: 1,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingLeft: 48,
    paddingRight: 5,
  },
  userTextBubble: {
    paddingLeft: 18,
    paddingRight: 15,
    paddingVertical: 10,
    backgroundColor: USER_BACKGROUND_COLOR,
    borderRadius: 18,
  },
  gptTextBubble: {
    paddingLeft: 15,
    paddingRight: 18,
    paddingTop: 10,
    paddingBottom: 15,
    backgroundColor: GPT_BACKGROUND_COLOR,
    borderRadius: 18,
  },
  userText: {
    color: USER_TEXT_COLOR,
    fontSize: 15,
    lineHeight: 21,
  },
  gptText: {
    color: GPT_TEXT_COLOR,
    fontSize: 15,
    lineHeight: 21,
  },
  timestamp: {
    opacity: 0.5,
    textAlign: 'right',
  },
  gptPadding: {
    paddingLeft: 5,
    paddingVertical: 5,
  },
  gptTextColor: {
    color: 'rgba(255,255,255,0.5)',
  },
});

export default ChatMessage;
