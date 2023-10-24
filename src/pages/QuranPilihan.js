import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const QuranPilihan = () => {
  return (
    <View>
      <Text>Surah pilihan harian</Text>
    </View>
  );
};

export default QuranPilihan;

const styles = StyleSheet.create({
  subContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'space-around',
    marginTop: 15,
  },
  title: {
    fontSize: 17,
  },
});
