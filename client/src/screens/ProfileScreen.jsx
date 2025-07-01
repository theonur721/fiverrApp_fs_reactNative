import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {defaultScreenStyle} from '../constants/defaultScreenStyles';
import normalize from '../utils/normalize';
import {COLORS} from '../theme/colors';
import {ROUTES} from '../navigation/routes';
import LoginRegister from '../components/LoginRegister';
import {logoutUser} from '../store/actions/authActions';

const ProfileScreen = () => {
  const {user} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <SafeAreaView style={defaultScreenStyle.safeAreaContainer}>
      <View style={defaultScreenStyle.container}>
        {user ? (
          <>
            <View style={styles.topSection}>
              <Image style={styles.image} source={{uri: user.photo}} />
              <View style={styles.userInfo}>
                <Text style={styles.username}>@{user.username}</Text>
                <Text style={styles.email}>{user.email}</Text>
                <Text style={styles.userDetail}>{user.country}</Text>
                <Text style={styles.userCreatedat}>
                  Joined: {user.createdAt}
                </Text>

                {user.isSeller && (
                  <View style={styles.sellerInfoContainer}>
                    <Text style={styles.sellerStatus}>Seller Profile</Text>
                    <Text style={styles.userDetail}>Phone: {user.phone}</Text>
                    <Text style={styles.userDetail}>
                      Description: {user.desc}
                    </Text>
                  </View>
                )}
              </View>
            </View>

            <View style={styles.buttonsSection}>
              <ProfileButton label="Services" />
              <ProfileButton
                label="Add Service"
                onPress={() => navigation.navigate(ROUTES.ADDGIG)}
              />
              <ProfileButton label="Orders" />
              <ProfileButton label="Messages" />
              <ProfileButton label="Logout" onPress={handleLogout} isLogout />
            </View>
          </>
        ) : (
          <View style={styles.noUserBox}>
            <Text style={styles.noUserData}>👋 Welcome!</Text>
            <Text style={styles.noUserDataDesc}>
              Sign up or log in to join the Fiverr community.
            </Text>
            <LoginRegister />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

// 🔹 Özel buton bileşeni
const ProfileButton = ({label, onPress, isLogout}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.buttonContainer,
      isLogout && {backgroundColor: COLORS.primary + '10'},
    ]}>
    <Text style={[styles.buttonText, isLogout && {color: COLORS.primary}]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  topSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: normalize(16),
    marginBottom: normalize(30),
  },
  image: {
    width: normalize(90),
    height: normalize(90),
    borderRadius: 45,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  userInfo: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingVertical: normalize(4),
  },
  username: {
    fontSize: normalize(20),
    fontWeight: 'bold',
    marginBottom: normalize(6),
    color: COLORS.black,
  },
  email: {
    fontSize: normalize(15),
    color: COLORS.darkGray,
    marginBottom: normalize(4),
  },
  userDetail: {
    fontSize: normalize(14),
    color: COLORS.black,
    marginBottom: normalize(4),
  },
  userCreatedat: {
    fontSize: normalize(13),
    color: COLORS.darkGray,
    marginBottom: normalize(6),
  },
  sellerInfoContainer: {
    marginTop: normalize(8),
    paddingLeft: normalize(10),
    borderLeftWidth: 2,
    borderLeftColor: COLORS.primary,
  },
  sellerStatus: {
    fontSize: normalize(15),
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: normalize(4),
  },
  buttonsSection: {
    gap: normalize(12),
    marginTop: normalize(10),
  },
  buttonContainer: {
    width: '100%',
    paddingVertical: normalize(14),
    paddingHorizontal: normalize(12),
    backgroundColor: COLORS.white,
    borderRadius: normalize(10),
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    shadowColor: COLORS.black,
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    fontSize: normalize(16),
    color: COLORS.black,
    fontWeight: '500',
  },
  noUserBox: {
    alignItems: 'center',
    marginTop: normalize(50),
    paddingHorizontal: normalize(20),
  },
  noUserData: {
    fontSize: normalize(28),
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: normalize(8),
  },
  noUserDataDesc: {
    fontSize: normalize(16),
    color: COLORS.darkGray,
    textAlign: 'center',
    marginBottom: normalize(24),
  },
});
