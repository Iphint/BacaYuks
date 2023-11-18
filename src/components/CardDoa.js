import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Image } from 'react-native';
import { Card } from '../assets';

const CardDoa = () => {
  return (
    <View style={styles.container}>
      <Image source={Card} style={{ width: 80, height: 80 }} />
      <Text style={{ fontSize: 20 }}>CardDoa</Text>
      <Text>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis dolores
        quos excepturi ea impedit nisi sit. Eligendi, enim? Nisi impedit
        veritatis neque obcaecati, corporis vero quisquam consequatur cupiditate
        ut iure optio unde officia tempora numquam placeat aperiam ratione quod
        consectetur!
      </Text>
    </View>
  );
};

export default CardDoa;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    width: '100%',
    padding: 10,
    marginBottom: 30,
    borderColor: '#ffff',
    borderRadius: 10,
  },
});
