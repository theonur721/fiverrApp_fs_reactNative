import {StyleSheet} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ROUTES} from './routes';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {Home, Profile} from 'iconsax-react-native';
import {COLORS} from '../theme/colors';
import normalize from '../utils/normalize';

const Tab = createBottomTabNavigator();

const Tabrouter = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.secondary,
          height: 90,
          paddingBottom: 20,
          borderTopWidth: 0,
          shadowColor: COLORS.black,
          shadowOpacity: 0.1,
          shadowOffset: {width: 0, height: -2},
          shadowRadius: 5,
        },
        tabBarIconStyle: {
          marginBottom: 0,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: 'bold',
          marginBottom: 5,
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.lightGray,
      }}>
      <Tab.Screen
        name={ROUTES.HOME}
        component={HomeScreen}
        options={({route}) => ({
          tabBarIcon: ({focused, color, size}) => (
            <Home
              size={32}
              color={color}
              variant={focused ? 'Bold' : 'Outline'}
            />
          ),
        })}
      />

      <Tab.Screen
        name={ROUTES.PROFILE}
        component={ProfileScreen}
        options={({route}) => ({
          tabBarIcon: ({focused, color, size}) => (
            <Profile
              size={32}
              color={color}
              variant={focused ? 'Bold' : 'Outline'}
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default Tabrouter;

const styles = StyleSheet.create({
  tabBarIcon: {
    marginBottom: normalize(0),
  },
  tabBarLabel: {
    fontSize: normalize(12),
    fontWeight: 'bold',
  },
});
