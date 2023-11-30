import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { useFonts } from 'expo-font';

const CustomInputText = ({ placeholder, isPassword }) => {
  let [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('../../assets/fonts/Poppins-SemiBold.ttf'),
  });
  
  const [inputValue, setInputValue] = useState('');
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={inputValue}
        placeholderTextColor="rgba(178, 236, 255, 0.8)"
        secureTextEntry={isPassword}
        onChangeText={(text) => setInputValue(text)}
      />
    </View>
  );
};

export default CustomInputText;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
    alignSelf: "center",
    width:320,
  },
  input: {
    borderWidth: 2,
    borderTopWidth: 3,
    borderBottomWidth:3,
    borderColor: '#b2ecff',
    padding: 5,
    paddingLeft: 12,
    borderRadius: 15,
  },
});
