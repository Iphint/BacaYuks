import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CardDoa from '../components/CardDoa';
import { ScrollView } from 'react-native';

const Doa = () => {
  return (
    <View style={styles.container}>
      <Text>Doa sehari hari.</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <CardDoa />
        <CardDoa />
        <CardDoa />
        <CardDoa />
        <CardDoa />
      </ScrollView>
    </View>
  );
};

export default Doa;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
});
