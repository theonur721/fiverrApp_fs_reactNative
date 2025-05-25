import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import Button from '../../components/Button';
import {SafeAreaView} from 'react-native-safe-area-context';
import {defaultScreenStyle} from '../../constants/defaultScreenStyles';
import {COLORS} from '../../theme/colors';
import {ArrowLeft2} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '../../navigation/routes';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser} from '../../store/actions/authActions';

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {loading, error, isAuthenticated} = useSelector(state => state.auth); // isAuthenticated'ı ekledik

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required('Username is required')
        .min(3, 'Minimum 3 characters'),
      password: Yup.string()
        .required('Password is required')
        .min(6, 'Minimum 6 characters'),
    }),
    onSubmit: values => {
      dispatch(
        loginUser({
          username: values.username,
          password: values.password,
        }),
      );
    },
  });

  // useEffect içinde isAuthenticated kontrolü ekledim
  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate(ROUTES.HOME); // Başarılı girişten sonra ana sayfaya yönlendir
    }
  }, [isAuthenticated, navigation]); // isAuthenticated'i gözlemledik

  return (
    <SafeAreaView style={defaultScreenStyle.safeAreaContainer}>
      <View style={defaultScreenStyle.container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.arrowContainer}>
          <ArrowLeft2 size="32" color={COLORS.black} />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={formik.values.username}
          onChangeText={formik.handleChange('username')}
          onBlur={formik.handleBlur('username')}
        />
        {formik.touched.username && formik.errors.username ? (
          <Text style={styles.errorText}>{formik.errors.username}</Text>
        ) : null}
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
          onBlur={formik.handleBlur('password')}
          secureTextEntry
        />
        {formik.touched.password && formik.errors.password ? (
          <Text style={styles.errorText}>{formik.errors.password}</Text>
        ) : null}
        {error && <Text style={styles.errorText}>{error}</Text>}
        <Button title="Login" onPress={formik.handleSubmit} />
        <View style={styles.accountYetContainer}>
          <Text style={styles.accountYetText}>Don't have an account yet?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTES.REGISTER)}>
            <Text style={styles.accountYetRegister}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    alignSelf: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  arrowContainer: {
    marginBottom: 30,
  },
  accountYetContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  accountYetText: {
    fontSize: 16,
    color: COLORS.darkGray,
  },
  accountYetRegister: {
    fontSize: 16,
    color: COLORS.primary,
    marginLeft: 5,
    fontWeight: 'bold',
  },
});
