import React, {FC} from 'react';
import {StyleSheet, Text} from 'react-native';

export const ListEmptyComponent: FC = () => {
  return <Text style={styles.text}>No places found</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    marginTop: 10,
  },
});
