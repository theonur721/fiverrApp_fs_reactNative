import React, {useEffect} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchGigs} from '../../store/actions/gigActions';
import {defaultScreenStyle} from '../../constants/defaultScreenStyles';
import {COLORS} from '../../theme/colors';
import {ROUTES} from '../../navigation/routes';
import normalize from '../../utils/normalize';

const GigScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {gigs, loading, error, filters} = useSelector(state => state.gigs);

  useEffect(() => {
    dispatch(fetchGigs(filters));
  }, [dispatch, filters.search, filters.category]);

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    const errorMessage =
      typeof error === 'string'
        ? error
        : error.message || JSON.stringify(error);
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Error: {errorMessage}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={defaultScreenStyle.safeAreaContainer}>
      <Text style={styles.countText}>{gigs.length} gigs found</Text>

      <FlatList
        data={gigs}
        numColumns={2}
        keyExtractor={item => item._id.toString()}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.gigItem}
            onPress={() => {
              navigation.navigate(ROUTES.GIGDETAIL, {gigId: item._id});
            }}>
            <Image
              source={{uri: item.cover}}
              style={styles.gigImage}
              resizeMode="cover"
            />
            <View style={styles.gigInfo}>
              <Text style={styles.gigTitle} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.username}>by {item.user.username}</Text>
              <View style={styles.footerRow}>
                <Text style={styles.starText}>★ {item.starCount}</Text>
                <Text style={styles.price}>{item.price} $</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text>No gigs available.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default GigScreen;

const styles = StyleSheet.create({
  countText: {
    fontSize: normalize(16),
    fontWeight: '600',
    color: COLORS.primary,
    paddingHorizontal: normalize(16),
    paddingTop: normalize(12),
    paddingBottom: normalize(4),
  },
  listContainer: {
    paddingHorizontal: normalize(10),
    paddingBottom: normalize(20),
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: normalize(14),
  },
  gigItem: {
    marginBottom: normalize(12),
    backgroundColor: COLORS.white,
    borderRadius: normalize(10),
    width: '48%',
    padding: normalize(10),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: normalize(2)},
    shadowOpacity: 0.1,
    shadowRadius: normalize(4),
    elevation: 3,
  },
  gigImage: {
    width: '100%',
    height: normalize(100),
    borderRadius: normalize(10),
  },
  gigInfo: {
    marginTop: normalize(8),
  },
  gigTitle: {
    fontSize: normalize(14),
    fontWeight: '600',
    color: COLORS.black,
  },
  username: {
    fontSize: normalize(13),
    color: COLORS.secondary,
    marginVertical: normalize(4),
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  starText: {
    color: '#f1c40f',
    fontSize: normalize(13),
    fontWeight: '600',
  },
  price: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: normalize(13),
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: normalize(14),
  },
});
