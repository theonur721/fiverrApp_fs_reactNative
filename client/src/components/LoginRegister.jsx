import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS} from '../theme/colors';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '../navigation/routes';
import normalize from '../utils/normalize';

const LoginRegister = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate(ROUTES.REGISTER)}
        style={[styles.button, styles.borderButton]}>
        <Text style={styles.buttonTextR}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate(ROUTES.LOGIN)}
        style={[styles.button, styles.primaryButton]}>
        <Text style={styles.buttonTextL}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginRegister;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    marginTop: normalize(20), // Butonlar için üstten biraz boşluk
  },
  button: {
    width: '48%', // Butonlar yanyana
    paddingVertical: normalize(12),
    borderRadius: normalize(10),
    alignItems: 'center',
    height: normalize(50),
    justifyContent: 'center',
  },
  borderButton: {
    borderWidth: normalize(2),
    borderColor: COLORS.primary,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
  },
  buttonTextR: {
    color: COLORS.primary,
    fontSize: normalize(16),
    fontWeight: 'bold',
  },
  buttonTextL: {
    color: COLORS.white,
    fontSize: normalize(16),
    fontWeight: 'bold',
  },
});
