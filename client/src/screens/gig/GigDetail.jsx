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
import normalize from '../../utils/normalize';

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

  const allImages = [gig.cover, ...(gig.images || [])];

  return (
    <ScrollView style={defaultScreenStyle.safeAreaContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{gig.title}</Text>
        <Text style={styles.username}>by {gig.user.username}</Text>
        <View style={styles.separator} />
      </View>

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
    paddingHorizontal: normalize(16),
    paddingTop: normalize(6),
    paddingBottom: normalize(4),
    marginBottom: normalize(4),
    backgroundColor: '#fafafa',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: normalize(1)},
    shadowOpacity: 0.1,
    shadowRadius: normalize(2),
    elevation: 2,
    borderRadius: normalize(8),
  },
  title: {
    fontSize: normalize(24),
    fontWeight: '800',
    color: COLORS.black,
    marginBottom: normalize(2),
    textShadowColor: 'rgba(0,0,0,0.1)',
    textShadowOffset: {width: 0, height: normalize(1)},
    textShadowRadius: normalize(2),
  },
  username: {
    fontSize: normalize(14),
    color: COLORS.secondary,
    marginBottom: normalize(4),
  },
  separator: {
    height: normalize(1),
    backgroundColor: COLORS.lightGray,
    marginTop: normalize(4),
  },
  imagesContainer: {
    marginTop: normalize(8),
    paddingLeft: normalize(16),
    paddingVertical: normalize(4),
    marginBottom: normalize(12),
  },
  imageItem: {
    width: width / 2.5,
    height: normalize(130),
    borderRadius: normalize(12),
    marginRight: normalize(10),
  },
  noImagesText: {
    paddingLeft: normalize(16),
    color: COLORS.secondary,
    fontSize: normalize(14),
  },
  content: {
    paddingHorizontal: normalize(16),
    paddingTop: normalize(2),
    paddingBottom: normalize(16),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: normalize(6),
    marginTop: normalize(6),
  },
  star: {
    fontSize: normalize(15),
    color: '#f1c40f',
    fontWeight: '700',
  },
  price: {
    fontSize: normalize(18),
    color: COLORS.primary,
    fontWeight: '800',
  },
  subheading: {
    fontSize: normalize(16),
    fontWeight: '700',
    color: COLORS.secondary,
    marginTop: normalize(6),
    marginBottom: normalize(2),
  },
  text: {
    fontSize: normalize(14),
    color: COLORS.black,
    marginBottom: normalize(6),
  },
  description: {
    fontSize: normalize(14),
    color: COLORS.black,
    lineHeight: normalize(22),
    marginBottom: normalize(6),
  },
  featureItem: {
    fontSize: normalize(14),
    color: COLORS.black,
    marginLeft: normalize(8),
    marginTop: normalize(4),
    marginBottom: normalize(2),
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: normalize(16),
    padding: normalize(10),
  },
});
