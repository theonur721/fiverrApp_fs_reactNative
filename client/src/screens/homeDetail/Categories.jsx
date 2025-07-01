import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {setCategory} from '../../store/slice/gigSlice';
import {fetchGigs} from '../../store/actions/gigActions';
import {categoriesList} from '../../constants/categoriesList';
import normalize from '../../utils/normalize';
import {COLORS} from '../../theme/colors';
import {ROUTES} from '../../navigation/routes';

const Categories = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onCategoryPress = category => {
    dispatch(setCategory(category));
    dispatch(fetchGigs({category}));
    navigation.navigate(ROUTES.GIGS);
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onCategoryPress(item.name)}>
      <View style={styles.content}>
        <View style={styles.iconBox}>
          <Text style={styles.icon}>{item.icon}</Text>
        </View>
        <Text style={styles.name} numberOfLines={2}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      horizontal
      data={categoriesList}
      renderItem={renderItem}
      keyExtractor={item => item.name}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
    />
  );
};

export default Categories;

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: normalize(10),
    paddingLeft: normalize(4),
  },
  card: {
    width: normalize(110),
    height: normalize(120),
    backgroundColor: COLORS.white,
    borderRadius: normalize(14),
    marginRight: normalize(12),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.black,
    shadowOpacity: 0.08,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    paddingHorizontal: normalize(6),
  },
  iconBox: {
    width: normalize(48),
    height: normalize(48),
    borderRadius: normalize(24),
    backgroundColor: COLORS.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(10),
  },
  icon: {
    fontSize: normalize(28),
  },
  name: {
    fontSize: normalize(13),
    fontWeight: '600',
    textAlign: 'center',
    color: COLORS.black,
    maxWidth: normalize(90),
  },
});
