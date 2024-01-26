import React from 'react';
import { StyleSheet, View, Text, Pressable, Image } from 'react-native';

type IProps = {
  onPress: () => void;
};

const Assistant = ({ onPress }: IProps) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <Image
            source={require('../assets/avatar1.png')}
            style={styles.avatar}
            resizeMode="contain"
          />
        </View>
        <View style={styles.info}>
          <Text style={styles.nameText}>Steph</Text>
          <Text style={styles.emailText}>steph@myninja.ai</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 75,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    backgroundColor: 'black',
    borderColor: 'rgba(255,255,255,0.2)',
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'white',
    marginRight: 15,
    overflow: 'hidden',
  },
  info: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  nameText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
  },
  emailText: {
    color: 'rgba(255,255,255,0.7)',
  },
  avatar: {
    height: 50,
    width: 50,
  },
});

export default Assistant;
