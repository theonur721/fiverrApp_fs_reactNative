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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Categories</Text>

      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        keyExtractor={item => item.name}
        data={categoriesList}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => onCategoryPress(item.name)}
              style={styles.item}>
              <View style={styles.iconWrapper}>
                <Text style={styles.icon}>{item.icon}</Text>
              </View>
              <Text style={styles.text}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    marginTop: normalize(16),
    paddingVertical: normalize(16),
    paddingHorizontal: normalize(12),
  },
  header: {
    fontSize: normalize(22),
    fontWeight: 'bold',
    marginBottom: normalize(16),
  },
  item: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingVertical: normalize(12),
    paddingHorizontal: normalize(16),
    borderRadius: normalize(12),
    marginRight: normalize(12),
    alignItems: 'center',
    justifyContent: 'center',
    width: normalize(110),
  },
  iconWrapper: {
    height: normalize(50),
    width: normalize(50),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: normalize(8),
  },
  icon: {
    fontSize: normalize(38),
    lineHeight: normalize(42),
    textAlign: 'center',
  },
  text: {
    fontSize: normalize(14),
    textAlign: 'center',
    fontWeight: '500',
  },
});
