import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Flow } from 'react-native-animated-spinkit';

const DOTS_COLOR = 'rgba(0,0,0,0.5)';

const Loading = () => {
  return (
    <View style={styles.container}>
      <View style={styles.gpt}>
        <Text style={styles.gptText}>ChatGPT</Text>
      </View>
      <View style={styles.innerContainer}>
        <View style={styles.bubble}>
          <Flow color={DOTS_COLOR} size={48} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 10,
    height: 65,
  },
  innerContainer: {
    flexDirection: 'row',
    paddingLeft: 5,
  },
  bubble: {
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderTopLeftRadius: 0,
  },
  gpt: {
    paddingLeft: 5,
    paddingVertical: 5,
  },
  gptText: {
    color: 'rgba(255,255,255,0.5)',
  },
});

export default Loading;
