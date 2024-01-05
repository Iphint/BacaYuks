import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Image } from 'react-native';
import { Card } from '../assets';

const CardDoa = ({ doa, ayat, latin, artinya }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{doa}</Text>
      <Text style={styles.detail}>Ayat: {ayat}</Text>
      <Text style={styles.detail}>Latin: {latin}</Text>
      <Text style={styles.detail}>Artinya: {artinya}</Text>
    </View>
  );
};

export default CardDoa;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    width: 100,
    marginHorizontal: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 5,
    color: '#ffffff',
  },
  detail: {
    fontSize: 16,
    marginVertical: 2,
    color: '#ffffff',
  },
});
