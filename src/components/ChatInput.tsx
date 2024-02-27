import React, { useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  TextStyle,
} from 'react-native';

type IProps = {
  disabled: boolean; // TODO
  chatContent: string;
  onChangeChatContent: (c: string) => void;
  onSendMessage: () => void;
};

const ARROW_COLOR = '#4682B4';
const ARROW_COLOR_DISABLED = 'rgba(255, 255, 255, 0.3)';

const ChatInput = ({
  disabled,
  chatContent,
  onChangeChatContent,
  onSendMessage,
}: IProps) => {
  const arrowColorStyle: TextStyle = useMemo(() => {
    return {
      color: disabled ? ARROW_COLOR_DISABLED : ARROW_COLOR,
    }
  }, [disabled]);

  return (
    <View style={styles.container}>
      <TextInput
        value={chatContent}
        onChangeText={onChangeChatContent}
        placeholder="Start your conversation here"
        placeholderTextColor={'grey'}
        style={styles.inputContainer}
        autoCorrect={true}
        textAlignVertical="top"
        multiline
        selectionColor={'green'}
      />
      <Pressable
        onPress={onSendMessage}
        style={styles.sendButton}
        disabled={disabled}
      >
        <Text style={[styles.arrow, arrowColorStyle]}>{'\u27A4'}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    paddingLeft: 8,
    backgroundColor: 'black',
    marginTop: 6,
    borderRadius: 12,
    borderColor: 'rgba(255,255,255,0.5)',
    borderWidth: 1,
    marginHorizontal: 1,
  },
  inputContainer: {
    flex: 1,
    minHeight: 40,
    fontSize: 16,
    paddingTop: 10,
    color: 'white',
  },
  sendButton: {
    height: 44,
    width: 44,
    marginLeft: 6,
    justifyContent: 'center',
    paddingTop: 2,
    alignItems: 'center',
  },
  arrow: {
    fontSize: 50,
    lineHeight: 50,
  },
});

export default ChatInput;
