import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated, Pressable} from 'react-native';
import normalize from '../utils/normalize';

const Toggler = ({value, onChange}) => {
  const animation = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: value ? 1 : 0,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [value]);

  const interpolateBackground = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#efefef', '#2a2a2a'],
  });

  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [7, 38],
  });

  return (
    <Pressable onPress={() => onChange(!value)}>
      <Animated.View
        style={[
          styles.toggleContainer,
          {backgroundColor: interpolateBackground},
        ]}>
        <Animated.View style={[styles.circle, {transform: [{translateX}]}]} />
      </Animated.View>
    </Pressable>
  );
};

export default Toggler;

const styles = StyleSheet.create({
  toggleContainer: {
    width: normalize(100),
    height: normalize(50),
    borderRadius: normalize(999),
    backgroundColor: '#efefef',
    justifyContent: 'center',
    paddingHorizontal: normalize(5),
  },
  circle: {
    width: normalize(36),
    height: normalize(36),
    borderRadius: normalize(18),
    backgroundColor: '#fff',
  },
});
