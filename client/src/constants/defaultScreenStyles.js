import {StyleSheet} from 'react-native';
import {COLORS} from '../theme/colors';
import normalize from '../utils/normalize';

const defaultScreenStyle = StyleSheet.create({
  container: {
    padding: normalize(10),
    backgroundColor: COLORS.white,
  },
  safeAreaContainer: {
    flex: 1,
  },
});

export {defaultScreenStyle};
