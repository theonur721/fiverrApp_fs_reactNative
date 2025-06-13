import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {COLORS} from '../../theme/colors';
import {defaultScreenStyle} from '../../constants/defaultScreenStyles';

const {width} = Dimensions.get('window');

const GigDetail = () => {
  const route = useRoute();
  const {gigId} = route.params;

  const {gigs, loading, error} = useSelector(state => state.gigs);
  const gig = gigs.find(g => g._id === gigId);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>
          Error: {typeof error === 'string' ? error : JSON.stringify(error)}
        </Text>
      </View>
    );
  }

  if (!gig) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Gig not found</Text>
      </View>
    );
  }

  // Görselleri cover + images olarak birleştiriyoruz
  const allImages = [gig.cover, ...(gig.images || [])];

  return (
    <ScrollView style={defaultScreenStyle.safeAreaContainer}>
      {/* Başlık */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{gig.title}</Text>
        <Text style={styles.username}>by {gig.user.username}</Text>
        <View style={styles.separator} />
      </View>

      {/* Tüm görseller yatay scroll içinde */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.imagesContainer}>
        {allImages.length > 0 ? (
          allImages.map((img, index) => (
            <Image key={index} source={{uri: img}} style={styles.imageItem} />
          ))
        ) : (
          <Text style={styles.noImagesText}>No images available.</Text>
        )}
      </ScrollView>

      {/* İçerik */}
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.star}>★ {gig.starCount}</Text>
          <Text style={styles.price}>{gig.price} $</Text>
        </View>

        <Text style={styles.subheading}>Short Title</Text>
        <Text style={styles.text}>{gig.shortTitle}</Text>

        <Text style={styles.subheading}>Short Description</Text>
        <Text style={styles.text}>{gig.shortDes}</Text>

        <Text style={styles.subheading}>Description</Text>
        <Text style={styles.description}>{gig.desc}</Text>

        <Text style={styles.subheading}>Delivery Time</Text>
        <Text style={styles.text}>{gig.deliveryTime} days</Text>

        <Text style={styles.subheading}>Revisions</Text>
        <Text style={styles.text}>{gig.revisionNumber} times</Text>

        <Text style={styles.subheading}>Features</Text>
        {gig.features && gig.features.length > 0 ? (
          gig.features.map((feature, idx) => (
            <Text key={idx} style={styles.featureItem}>
              • {feature}
            </Text>
          ))
        ) : (
          <Text style={styles.text}>No features listed.</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default GigDetail;

const styles = StyleSheet.create({
  titleContainer: {
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 4,
    marginBottom: 4,
    backgroundColor: '#fafafa',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.black,
    marginBottom: 2,
    textShadowColor: 'rgba(0,0,0,0.1)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 2,
  },
  username: {
    fontSize: 14,
    color: COLORS.secondary,
    marginBottom: 4,
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.lightGray,
    marginTop: 4,
  },
  imagesContainer: {
    marginTop: 8,
    paddingLeft: 16,
    paddingVertical: 4,
    marginBottom: 12,
  },
  imageItem: {
    width: width / 2.5,
    height: 130,
    borderRadius: 12,
    marginRight: 10,
  },
  noImagesText: {
    paddingLeft: 16,
    color: COLORS.secondary,
    fontSize: 14,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 2,
    paddingBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
    marginTop: 6,
  },
  star: {
    fontSize: 15,
    color: '#f1c40f',
    fontWeight: '700',
  },
  price: {
    fontSize: 18,
    color: COLORS.primary,
    fontWeight: '800',
  },
  subheading: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.secondary,
    marginTop: 6,
    marginBottom: 2,
  },
  text: {
    fontSize: 14,
    color: COLORS.black,
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: COLORS.black,
    lineHeight: 22,
    marginBottom: 6,
  },
  featureItem: {
    fontSize: 14,
    color: COLORS.black,
    marginLeft: 8,
    marginTop: 4,
    marginBottom: 2,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    padding: 10,
  },
});
