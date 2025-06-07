import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {COLORS} from '../../theme/colors';
import {defaultScreenStyle} from '../../constants/defaultScreenStyles';

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

  return (
    <ScrollView style={defaultScreenStyle.safeAreaContainer}>
      {/* Kapak görseli */}
      <Image source={{uri: gig.cover}} style={styles.image} />

      {/* Temel bilgiler */}
      <View style={styles.content}>
        <Text style={styles.title}>{gig.title}</Text>
        <Text style={styles.username}>by {gig.user.username}</Text>

        <View style={styles.row}>
          <Text style={styles.star}>★ {gig.starCount}</Text>
          <Text style={styles.price}>{gig.price} $</Text>
        </View>

        {/* Kısa açıklamalar */}
        <Text style={styles.subheading}>Short Title</Text>
        <Text style={styles.text}>{gig.shortTitle}</Text>

        <Text style={styles.subheading}>Short Description</Text>
        <Text style={styles.text}>{gig.shortDes}</Text>

        {/* Ana açıklama */}
        <Text style={styles.subheading}>Description</Text>
        <Text style={styles.description}>{gig.desc}</Text>

        {/* Detaylar */}
        <Text style={styles.subheading}>Delivery Time</Text>
        <Text style={styles.text}>{gig.deliveryTime} days</Text>

        <Text style={styles.subheading}>Revisions</Text>
        <Text style={styles.text}>{gig.revisionNumber} times</Text>

        {/* Özellikler listesi */}
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

        {/* Ek görseller */}
        <Text style={styles.subheading}>Additional Images</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {gig.images && gig.images.length > 0 ? (
            gig.images.map((img, index) => (
              <Image
                key={index}
                source={{uri: img}}
                style={styles.additionalImage}
              />
            ))
          ) : (
            <Text style={styles.text}>No images provided.</Text>
          )}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default GigDetail;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 220,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.black,
    marginBottom: 6,
  },
  username: {
    fontSize: 15,
    color: COLORS.secondary,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  star: {
    fontSize: 14,
    color: '#f1c40f',
    fontWeight: '600',
  },
  price: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: '700',
  },
  subheading: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.secondary,
    marginTop: 16,
    marginBottom: 6,
  },
  text: {
    fontSize: 14,
    color: COLORS.black,
  },
  description: {
    fontSize: 14,
    color: COLORS.black,
    lineHeight: 22,
  },
  featureItem: {
    fontSize: 14,
    color: COLORS.black,
    marginLeft: 8,
    marginTop: 4,
  },
  additionalImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
    marginTop: 10,
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
