import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import Button from '../../components/Button';
import {SafeAreaView} from 'react-native-safe-area-context';
import {defaultScreenStyle} from '../../constants/defaultScreenStyles';
import Toggler from '../../components/Toggler';
import {COLORS} from '../../theme/colors';
import {ArrowLeft2} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '../../navigation/routes';
import {launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {registerUser} from '../../store/actions/authActions';
import Toast from 'react-native-toast-message';
import normalize from '../../utils/normalize';

const RegisterScreen = () => {
  const {loading} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [photoUri, setPhotoUri] = useState('');

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      photo: '', // Burada boş bir fotoğraf değeri var
      country: '',
      phone: '',
      desc: '',
      isSeller: false,
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required('Username is required')
        .min(3, 'Username should be at least 3 characters'),
      email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password should be at least 6 characters')
        .required('Password is required'),
      photo: Yup.string()
        .nullable()
        .test(
          'is-valid-photo',
          'Photo must be selected',
          value => value !== '',
        ),
      country: Yup.string().required('Country is required'),
      phone: Yup.number().optional(),
      desc: Yup.string().optional(),
    }),
    onSubmit: async values => {
      try {
        const formData = new FormData();
        formData.append('username', values.username);
        formData.append('email', values.email);
        formData.append('password', values.password);
        formData.append('country', values.country);
        formData.append('phone', values.phone);
        formData.append('desc', values.desc);
        formData.append('isSeller', values.isSeller);

        // Fotoğraf dosyasını FormData'ya uygun şekilde ekle:
        formData.append('photo', {
          uri: values.photo,
          name: 'profile.jpg', // İsteğe bağlı: orijinal dosya adı olabilir
          type: 'image/jpeg', // ya da 'image/png'
        });

        const resultAction = await dispatch(registerUser(formData));

        if (registerUser.fulfilled.match(resultAction)) {
          Toast.show({
            type: 'success',
            text1: 'Registration Successful',
            text2: 'Welcome to Fiverr 👋',
          });
          navigation.navigate(ROUTES.LOGIN);
        } else {
          Toast.show({
            type: 'error',
            text1: 'Registration Failed',
            text2: resultAction.payload?.message || 'Please try again.',
          });
        }
      } catch (error) {
        console.error('Registration error:', error);
        Toast.show({
          type: 'error',
          text1: 'Registration Error',
          text2: 'Something went wrong.',
        });
      }
    },
  });

  const handleSelectPhoto = () => {
    launchImageLibrary({mediaType: 'photo', quality: 1}, response => {
      if (
        !response.didCancel &&
        response.assets &&
        response.assets.length > 0
      ) {
        setPhotoUri(response.assets[0].uri);
        formik.setFieldValue('photo', response.assets[0].uri);
      }
    });
  };

  return (
    <SafeAreaView style={defaultScreenStyle.safeAreaContainer}>
      <View style={defaultScreenStyle.container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.arrowContainer}>
          <ArrowLeft2 size={normalize(32)} color={COLORS.black} />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Username"
          value={formik.values.username}
          onChangeText={formik.handleChange('username')}
          onBlur={formik.handleBlur('username')}
        />
        {formik.touched.username && formik.errors.username && (
          <Text style={styles.errorText}>{formik.errors.username}</Text>
        )}

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={formik.values.email}
          onChangeText={text =>
            formik.setFieldValue('email', text.toLowerCase())
          }
          onBlur={formik.handleBlur('email')}
        />
        {formik.touched.email && formik.errors.email && (
          <Text style={styles.errorText}>{formik.errors.email}</Text>
        )}

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
          secureTextEntry
          onBlur={formik.handleBlur('password')}
        />
        {formik.touched.password && formik.errors.password && (
          <Text style={styles.errorText}>{formik.errors.password}</Text>
        )}

        <TouchableOpacity
          onPress={handleSelectPhoto}
          style={styles.photoButton}>
          <Text style={styles.photoButtonText}>Select Photo</Text>
        </TouchableOpacity>
        {formik.touched.photo && formik.errors.photo && (
          <Text style={styles.errorText}>{formik.errors.photo}</Text>
        )}

        {/* Varsayılan resim kontrolü */}
        <Image
          source={{uri: photoUri || 'path/to/default.jpg'}} // Eğer fotoğraf seçilmemişse varsayılan resim
          style={styles.selectedImage}
        />

        <TextInput
          style={styles.input}
          placeholder="Country"
          value={formik.values.country}
          onChangeText={formik.handleChange('country')}
          onBlur={formik.handleBlur('country')}
        />
        {formik.touched.country && formik.errors.country && (
          <Text style={styles.errorText}>{formik.errors.country}</Text>
        )}

        <View style={styles.togglerContainer}>
          <Text style={styles.togglerText}>Are you a seller?</Text>
          <Toggler
            value={formik.values.isSeller}
            onChange={val => formik.setFieldValue('isSeller', val)}
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Phone (optional)"
          value={formik.values.phone}
          onChangeText={formik.handleChange('phone')}
          onBlur={formik.handleBlur('phone')}
          keyboardType="numeric"
          editable={formik.values.isSeller}
        />
        <TextInput
          style={styles.input}
          placeholder="Description (optional)"
          value={formik.values.desc}
          onChangeText={formik.handleChange('desc')}
          onBlur={formik.handleBlur('desc')}
          editable={formik.values.isSeller}
        />

        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : (
          <Button title="Register" onPress={formik.handleSubmit} />
        )}

        <View style={styles.haveAccountContainer}>
          <Text style={styles.haveAccountYetText}>
            Do you already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate(ROUTES.LOGIN)}>
            <Text style={styles.haveAccountYetLogin}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: normalize(8),
    padding: normalize(12),
    marginBottom: normalize(10),
  },
  errorText: {
    color: 'red',
    fontSize: normalize(12),
    marginBottom: normalize(10),
  },
  togglerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: normalize(10),
    backgroundColor: COLORS.lightGray,
    padding: normalize(8),
    borderRadius: normalize(8),
  },
  togglerText: {
    fontSize: normalize(18),
    color: COLORS.darkGray,
    fontWeight: 'bold',
  },
  arrowContainer: {
    marginBottom: normalize(30),
  },
  photoButton: {
    padding: normalize(10),
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.lightGray,
    borderRadius: normalize(8),
    marginBottom: normalize(10),
    alignItems: 'center',
  },
  photoButtonText: {
    color: COLORS.primary,
    fontSize: normalize(16),
  },
  selectedImage: {
    width: normalize(100),
    height: normalize(100),
    marginTop: normalize(10),
    borderRadius: normalize(8),
  },
  haveAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: normalize(20),
  },
  haveAccountYetText: {
    fontSize: normalize(16),
    color: COLORS.darkGray,
  },
  haveAccountYetLogin: {
    fontSize: normalize(16),
    color: COLORS.primary,
    marginLeft: normalize(5),
    fontWeight: 'bold',
  },
});
