import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS} from '../theme/colors';
import normalize from '../utils/normalize';

const Button = ({title, onPress}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.blue,
    padding: normalize(18),
    borderRadius: normalize(5),
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: normalize(16),
  },
});
