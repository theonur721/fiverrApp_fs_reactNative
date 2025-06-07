import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {Picker} from '@react-native-picker/picker';
import {useDispatch, useSelector} from 'react-redux';
import {addGig} from '../../store/actions/gigActions';
import {categoriesNames} from '../../constants/categoriesList';

const AddGigScreen = () => {
  const dispatch = useDispatch();
  const {loading} = useSelector(state => state.gigs);

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [shortTitle, setShortTitle] = useState('');
  const [shortDes, setShortDes] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [revisionNumber, setRevisionNumber] = useState('');
  const [price, setPrice] = useState('');
  const [features, setFeatures] = useState('');
  const [category, setCategory] = useState(categoriesNames[0]);
  const [cover, setCover] = useState(null);
  const [images, setImages] = useState([]);

  const selectCover = () => {
    launchImageLibrary({mediaType: 'photo', selectionLimit: 1}, response => {
      if (!response.didCancel && !response.errorCode) {
        const asset = response.assets[0];
        setCover(asset);
      }
    });
  };

  const selectImages = () => {
    launchImageLibrary({mediaType: 'photo', selectionLimit: 0}, response => {
      if (!response.didCancel && !response.errorCode) {
        setImages(response.assets);
      }
    });
  };

  const handleAddGig = () => {
    if (
      !title ||
      !desc ||
      !shortTitle ||
      !shortDes ||
      !deliveryTime ||
      !revisionNumber ||
      !price ||
      !cover
    ) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    const gigData = {
      title,
      desc,
      shortTitle,
      shortDes,
      deliveryTime: Number(deliveryTime),
      revisionNumber: Number(revisionNumber),
      price: Number(price),
      category,
      cover: cover.uri,
      images: images.map(img => img.uri),
      features: features.split(',').map(f => f.trim()),
      // backend tarafında user ID JWT ile alınmalı, burada eklenmesine gerek yok
    };

    dispatch(addGig(gigData))
      .unwrap()
      .then(() => {
        Alert.alert('Success', 'Gig added successfully');
      })
      .catch(err => {
        Alert.alert('Error', err.message || 'Failed to add gig');
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />

      <Text style={styles.label}>Short Title</Text>
      <TextInput
        style={styles.input}
        value={shortTitle}
        onChangeText={setShortTitle}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={desc}
        onChangeText={setDesc}
        multiline
      />

      <Text style={styles.label}>Short Description</Text>
      <TextInput
        style={styles.input}
        value={shortDes}
        onChangeText={setShortDes}
      />

      <Text style={styles.label}>Delivery Time (days)</Text>
      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        value={deliveryTime}
        onChangeText={setDeliveryTime}
      />

      <Text style={styles.label}>Revision Number</Text>
      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        value={revisionNumber}
        onChangeText={setRevisionNumber}
      />

      <Text style={styles.label}>Price ($)</Text>
      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        value={price}
        onChangeText={setPrice}
      />

      <Text style={styles.label}>Category</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={category}
          onValueChange={itemValue => setCategory(itemValue)}>
          {categoriesNames.map((cat, idx) => (
            <Picker.Item key={idx} label={cat} value={cat} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Features (comma separated)</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Feature1, Feature2"
        value={features}
        onChangeText={setFeatures}
      />

      <Text style={styles.label}>Cover Image</Text>
      <Button title="Select Cover Image" onPress={selectCover} />
      {cover && (
        <Image
          source={{uri: cover.uri}}
          style={styles.coverImage}
          resizeMode="cover"
        />
      )}

      <Text style={styles.label}>Images</Text>
      <Button title="Select Multiple Images" onPress={selectImages} />
      <ScrollView horizontal style={styles.imagesContainer}>
        {images.map((img, idx) => (
          <Image
            key={idx}
            source={{uri: img.uri}}
            style={styles.image}
            resizeMode="cover"
          />
        ))}
      </ScrollView>

      <Button
        title={loading ? 'Adding...' : 'Add Gig'}
        onPress={handleAddGig}
        disabled={loading}
      />
    </ScrollView>
  );
};

export default AddGigScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 100,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 6,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    overflow: 'hidden',
  },
  coverImage: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 8,
  },
  imagesContainer: {
    marginTop: 10,
    flexDirection: 'row',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 8,
    borderRadius: 8,
  },
});
