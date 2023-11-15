import React, {FC} from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';

interface FloatingActionButtonProps {
  onPress: () => void;
}

export const FloatingActionButton: FC<FloatingActionButtonProps> = ({
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Image
        style={styles.tinyLogo}
        source={require('../../../assets/history.png')}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
    bottom: 30,
    right: 20,
    backgroundColor: '#29ADB2',
    borderRadius: 25,
  },
  tinyLogo: {
    width: 25,
    height: 25,
    tintColor: 'white',
  },
});
