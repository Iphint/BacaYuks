import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { useFonts } from 'expo-font';

const CustomInputText = ({ title, placeholder, isPassword, onChangeText, value }) => {
  let [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('../../assets/fonts/Poppins-SemiBold.ttf'),
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        placeholderTextColor="#FFFFFF"
        secureTextEntry={isPassword}
        onChangeText={onChangeText}
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
  title: {
    fontSize: 17,
    color: '#ffff',
    fontFamily: 'Poppins-Regular'
  },
});
