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
        placeholderTextColor='rgba(105, 215, 252, 1)'
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
    width: 340,
    borderRadius: 14,
    height: 45,
    borderColor: '#65D6FC',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginLeft: -20,
    color: 'rgba(105, 215, 252, 1)',
  },
  search: {
    width: 20,
    height: 20,
    marginLeft: -35,
  },
});
