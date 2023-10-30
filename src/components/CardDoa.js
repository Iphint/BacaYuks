import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Image } from 'react-native';
import { Card } from '../assets';

const CardDoa = () => {
  return (
    <View style={styles.container}>
      <Image source={Card} style={{ width: 80, height: 80 }} />
      <Text>CardDoa</Text>
    </View>
  );
};

export default CardDoa;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    width: 100,
    marginHorizontal: 5,
  },
  subContainer: {},
});
