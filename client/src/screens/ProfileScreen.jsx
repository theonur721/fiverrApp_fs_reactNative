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
          <View style={styles.topSection}>
            <View style={styles.userInfo}>
              <Text style={styles.username}>{user.username}</Text>
              <Text style={styles.email}>{user.email}</Text>
              <Text style={styles.userDetail}>{user.country}</Text>
              <Text style={styles.userCreatedat}>
                Created at: {user.createdAt}
              </Text>

              {/* isSeller kontrolü */}
              {user.isSeller && (
                <View style={styles.sellerInfoContainer}>
                  <Text style={styles.sellerStatus}>
                    Seller Status: {user.isSeller ? 'Yes' : 'No'}
                  </Text>
                  <Text style={styles.userDetail}>Phone: {user.phone}</Text>
                  <Text style={styles.userDetail}>
                    Description: {user.desc}
                  </Text>
                </View>
              )}
            </View>

            {/* Kullanıcının profil resmini dinamik olarak user'dan al */}
            <Image
              style={styles.image}
              source={{
                uri: user.photo,
              }}
            />
          </View>
        ) : (
          <>
            <Text style={styles.noUserData}>New here? 👋🙂</Text>
            <Text style={styles.noUserDataDesc}>
              Sign up or log in to join the community!
            </Text>
          </>
        )}

        {user ? (
          <View style={styles.buttonsSection}>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Services</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity
              onPress={() => navigation.navigate(ROUTES.ADDGIG)}
              style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Add Service</Text>
            </TouchableOpacity>
            <View style={styles.separator} />

            <TouchableOpacity style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Orders</Text>
            </TouchableOpacity>
            <View style={styles.separator} />

            <TouchableOpacity style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Messages</Text>
            </TouchableOpacity>
            <View style={styles.separator} />

            <TouchableOpacity
              onPress={() => handleLogout()}
              style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Exit</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.buttonsSection}>
            <LoginRegister />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  topSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: normalize(30),
  },
  userInfo: {
    flex: 1,
    justifyContent: 'flex-start',
    marginRight: normalize(20),
    paddingVertical: normalize(10), // User info'ya üstten ve alttan padding ekledim
  },
  username: {
    fontSize: normalize(22),
    fontWeight: 'bold',
    marginBottom: normalize(8), // Aralarına biraz daha boşluk ekledim
  },
  email: {
    fontSize: normalize(16),
    color: COLORS.darkGray,
    fontWeight: 'bold',
    marginBottom: normalize(6),
  },
  userDetail: {
    fontSize: normalize(15),
    marginBottom: normalize(6),
  },
  sellerInfoContainer: {
    marginTop: normalize(10), // Seller kısmı ile üst bilgilerin arasında boşluk
    paddingLeft: normalize(10), // Seller kısmını daha belirgin yapmak için biraz içeriye çekiyoruz
    borderLeftWidth: normalize(2),
    borderLeftColor: COLORS.primary, // Seller bilgilerini ayırt etmek için yeşil renk ekledim
    paddingVertical: normalize(10),
  },
  sellerStatus: {
    fontSize: normalize(16),
    fontWeight: 'bold',
    color: COLORS.primary, // Seller status için yeşil renk
    marginBottom: normalize(6),
  },
  image: {
    width: normalize(100),
    height: normalize(100),
    borderRadius: normalize(50),
  },
  buttonsSection: {
    alignItems: 'center',
    borderTopWidth: normalize(1),
    borderTopColor: '#ccc',
  },
  buttonContainer: {
    width: '100%',
    paddingVertical: normalize(15),
    paddingHorizontal: normalize(10),
    backgroundColor: '#fff',
  },
  buttonText: {
    fontSize: normalize(18),
    color: '#333',
  },
  separator: {
    height: normalize(1),
    backgroundColor: '#ccc',
    marginHorizontal: normalize(10),
  },
  userCreatedat: {
    fontSize: normalize(16),
    marginBottom: normalize(6),
    color: COLORS.darkGray,
  },
  noUserData: {
    fontSize: normalize(30),
    color: COLORS.darkGray,
    textAlign: 'center',
    marginTop: normalize(20),
    marginTop: normalize(50),
  },
  noUserDataDesc: {
    fontSize: normalize(18),
    color: COLORS.darkGray,
    textAlign: 'center',
    marginTop: normalize(10),
    marginBottom: normalize(20),
  },
});
