import React from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';

const QuranPilihan = () => {

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Surah pilihan harian</Text>
    </ScrollView>
  );
};

export default QuranPilihan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFFF'
  },
  ayahContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  ayahText: {
    fontSize: 17,
    color: '#333',
  },
  ayahNumber: {
    fontSize: 14,
    color: '#555',
  },
});
