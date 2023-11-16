import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const QuranPilihan = () => {
  const [bookmarkedAyahs, setBookmarkedAyahs] = useState([]);

  useEffect(() => {
    const loadBookmarkedAyahs = async () => {
      try {
        const ayahs = await AsyncStorage.getItem('bookmarks');
        if (ayahs !== null) {
          setBookmarkedAyahs(JSON.parse(ayahs));
        }
      } catch (e) {
        console.error('Failed to load bookmarks.', e);
      }
    };

    loadBookmarkedAyahs();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Surah pilihan harian</Text>
      {/* {bookmarkedAyahs.length > 0 ? (
        bookmarkedAyahs.map((ayah, index) => (
          <View key={index} style={styles.ayahContainer}>
            <Text style={styles.ayahNumber}>Ayah Number: {ayah.number}</Text>
          </View>
        ))
      ) : (
        <Text>Belum ada ayat yang dibookmark.</Text>
      )} */}
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
