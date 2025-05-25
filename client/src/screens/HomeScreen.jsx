import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {defaultScreenStyle} from '../constants/defaultScreenStyles';
import {COLORS} from '../theme/colors';
import LoginRegister from '../components/LoginRegister';
import normalize from '../utils/normalize';
import {useDispatch, useSelector} from 'react-redux';
import Categories from './homeDetail/Categories';
import {setSearch} from '../store/slice/gigSlice';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '../navigation/routes';
import {SearchNormal} from 'iconsax-react-native';

const HomeScreen = () => {
  const {user} = useSelector(state => state.auth);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    if (searchText.trim() !== '') {
      dispatch(setSearch(searchText));
      navigation.navigate(ROUTES.GIGS);
      Keyboard.dismiss();
    }
  };

  return (
    <SafeAreaView style={defaultScreenStyle.safeAreaContainer}>
      <View style={defaultScreenStyle.container}>
        <View style={styles.logoRow}>
          <Image style={styles.image} source={require('../assets/logo.png')} />
          {user && (
            <View style={styles.profileContainer}>
              <Text style={styles.username}>@{user.username}</Text>
              <Image
                source={{
                  uri: user.photo !== 'default.jpg' ? user.photo : undefined,
                }}
                style={styles.profileImage}
              />
            </View>
          )}
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            value={searchText}
            onChangeText={text => setSearchText(text)}
            placeholder="Search for a gig"
            returnKeyType="search"
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity style={styles.searchIcon} onPress={handleSearch}>
            <SearchNormal size={24} color={COLORS.black} variant="Outline" />
          </TouchableOpacity>
        </View>

        <View style={styles.centerContent}>
          <Text style={styles.welcomeText}>Hello Welcome Fiverr app!</Text>
          <Text style={styles.descriptionText}>
            Find the best services for you
          </Text>
          {!user && <LoginRegister />}
        </View>

        <Categories />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(20),
    borderWidth: normalize(2),
    borderColor: COLORS.lightGray,
    borderRadius: normalize(10),
    paddingHorizontal: normalize(10),
    backgroundColor: COLORS.white,
  },
  input: {
    flex: 1,
    height: normalize(50),
    fontSize: normalize(18),
  },
  searchIcon: {
    padding: normalize(5),
    marginLeft: normalize(5),
  },
  image: {
    width: normalize(100),
    height: normalize(30),
    resizeMode: 'contain',
  },
  centerContent: {
    backgroundColor: COLORS.white,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: normalize(40),
  },
  welcomeText: {
    fontSize: normalize(24),
    fontWeight: 'bold',
    marginBottom: normalize(10),
    color: COLORS.black,
  },
  descriptionText: {
    fontSize: normalize(16),
    marginBottom: normalize(30),
    textAlign: 'center',
    color: COLORS.black,
  },
  logoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: normalize(20),
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    fontSize: normalize(18),
    fontWeight: 'bold',
    color: COLORS.darkGray,
  },
  profileImage: {
    width: normalize(50),
    height: normalize(50),
    borderRadius: normalize(50),
    marginLeft: normalize(10),
    borderWidth: normalize(2),
    borderColor: COLORS.primary,
  },
});
