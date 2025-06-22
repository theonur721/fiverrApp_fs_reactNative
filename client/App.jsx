import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Router from './src/navigation/Router';
import {Provider, useDispatch} from 'react-redux';
import {store} from './src/store';
import Toast from 'react-native-toast-message';
import {loadUserFromStorage} from './src/store/actions/authActions';

const AppLoader = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, []);

  return (
    <>
      <Router />
      <Toast />
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppLoader />
      </NavigationContainer>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
