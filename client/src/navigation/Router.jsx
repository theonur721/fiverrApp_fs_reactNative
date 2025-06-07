import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ROUTES} from './routes';
import Tabrouter from './Tabrouter';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import GigScreen from '../screens/gig/GigScreen';
import {ArrowLeft2} from 'iconsax-react-native'; // kullanıyorsan
import {COLORS} from '../theme/colors'; // renk dosyan
import AddGigScreen from '../screens/gig/AddGigScreen';
import GigDetail from '../screens/gig/GigDetail';

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={ROUTES.TABROUTER} component={Tabrouter} />
      <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} />
      <Stack.Screen name={ROUTES.REGISTER} component={RegisterScreen} />
      <Stack.Screen
        name={ROUTES.GIGS}
        component={GigScreen}
        options={({navigation}) => ({
          headerShown: true,
          title: 'Gig List',
          headerLeft: () => (
            <TouchableOpacity
              style={styles.left}
              onPress={() => navigation.navigate(ROUTES.TABROUTER)}>
              <ArrowLeft2 size={32} color={COLORS.black} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name={ROUTES.ADDGIG}
        component={AddGigScreen}
        options={({navigation}) => ({
          headerShown: true,
          title: 'Add Gig ',
          headerLeft: () => (
            <TouchableOpacity
              style={styles.left}
              onPress={() => navigation.navigate(ROUTES.TABROUTER)}>
              <ArrowLeft2 size={32} color={COLORS.black} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name={ROUTES.GIGDETAIL}
        component={GigDetail}
        options={({navigation}) => ({
          headerShown: true,
          title: 'Gig Detail',
          headerLeft: () => (
            <TouchableOpacity
              style={styles.left}
              onPress={() => navigation.navigate(ROUTES.GIGS)}>
              <ArrowLeft2 size={32} color={COLORS.black} />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default Router;

const styles = StyleSheet.create({
  left: {
    marginLeft: 10,
    padding: 5,
  },
});
