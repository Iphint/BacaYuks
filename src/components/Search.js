import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { Image } from 'react-native';
import { Pencarian } from '../assets';
import { useFonts } from 'expo-font';

const Search = ({ placeholder, onSearch, value }) => {
  let [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
  });

  if (!fontsLoaded) {
    return <Text>Loading fonts</Text>;
  }
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={(text) => onSearch(text)}
        placeholder={placeholder}
        style={styles.textInput}
        placeholderTextColor="#FFFFFF"
      />
      <Image source={Pencarian} style={styles.search} />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    width: 300,
    borderRadius: 14,
    height: 55,
    borderColor: '#65D6FC',
    borderWidth: 1,
    paddingHorizontal: 10,
    color: '#FFFFFF',
  },
  search: {
    width: 35,
    height: 35,
    marginLeft: -50,
  },
});
