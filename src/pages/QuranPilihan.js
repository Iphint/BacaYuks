import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';

const QuranPilihan = () => {
  const [bookmarkedVerses, setBookmarkedVerses] = useState([]);

  useEffect(() => {
    const loadBookmarks = async () => {
      try {
        const bookmarks = await AsyncStorage.getItem('bookmarks');
        if (bookmarks !== null) {
          setBookmarkedVerses(JSON.parse(bookmarks));
        }
        console.log(bookmarks);
      } catch (error) {
        console.error('Error loading bookmarks:', error);
      }
    };

    loadBookmarks();
  }, []);

  const resetBookmarks = async () => {
    Alert.alert(
      "Reset Bookmarks",
      "Apakah Anda yakin ingin mereset bookmarks?",
      [
        {
          text: "Batal",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK", 
          onPress: async () => {
            try {
              await AsyncStorage.setItem('bookmarks', JSON.stringify([]));
              setBookmarkedVerses([]);
            } catch (error) {
              console.error('Error resetting bookmarks:', error);
            }
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Surah pilihan harian</Text>
        <TouchableOpacity activeOpacity={0.7} onPress={resetBookmarks}>
          <View style={styles.btnBookmarks}>
            <Text style={styles.bookmark}>Reset</Text>
          </View>
        </TouchableOpacity>
      </View>
      {bookmarkedVerses.length > 0 ? (
        bookmarkedVerses.map((verse, index) => (
          <View key={index} style={styles.ayahContainer}>
            <Text style={styles.ayahText}>{`Surah ${verse.surahName} Ayat ${verse.number}`}</Text>
          </View>
        ))
      ) : (
        <Text>No bookmarks found.</Text>
      )}
    </ScrollView>
  );
};

export default QuranPilihan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 17,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFF',
    fontFamily: "Poppins-Regular"
  },
  ayahContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  ayahText: {
    fontSize: 17,
    color: '#333',
    fontFamily: "Poppins-Regular"
  },
  ayahNumber: {
    fontSize: 14,
    color: '#555',
  },
  bookmark: {
    color: 'white',
    fontSize: 15,
    paddingVertical: 6,
    paddingHorizontal: 10,
    fontFamily: "Poppins-Regular"
  },
  btnBookmarks: {
    backgroundColor: 'red',
    borderRadius: 7,
  },
});
