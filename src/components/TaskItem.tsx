import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageSourcePropType,
} from 'react-native';

type IProps = {
  title: string;
  subtitle: string;
  avatarUri: string;
};

const TaskItem = ({ title, subtitle, avatarUri }: IProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          source={avatarUri as ImageSourcePropType}
          resizeMode="contain"
          style={styles.avatar}
        />
      </View>
      <View style={styles.info}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.subtitleText}>{subtitle}</Text>
      </View>
    </View>
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
  titleText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
  },
  subtitleText: {
    color: 'rgba(255,255,255,0.7)',
  },
  avatar: {
    width: 50,
    height: 50,
  },
});

export default TaskItem;
