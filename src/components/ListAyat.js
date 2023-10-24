import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import {
  BookmarkActive,
  BookmarkNonActive,
  Pause,
  Play,
  Tafsir,
} from '../assets';
import Gap from './atoms/Gap';
import Toast from 'react-native-toast-message';
import { Audio } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ListAyat = ({ surahData }) => {
  let [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
  });

  const navigation = useNavigation();

  const [bookmarkedVerses, setBookmarkedVerses] = useState({});
  const [playingUri, setPlayingUri] = useState(null);
  const [sound, setSound] = useState();

  useEffect(() => {
    const loadBookmarks = async () => {
      try {
        let bookmarks = await AsyncStorage.getItem('bookmarks');
        bookmarks = bookmarks ? JSON.parse(bookmarks) : [];
        const bookmarkMap = {};
        bookmarks.forEach((verse) => {
          bookmarkMap[verse.number] = true;
        });
        setBookmarkedVerses(bookmarkMap);
      } catch (error) {
        console.error('Failed to load bookmarks:', error);
      }
    };

    loadBookmarks();
  }, []);

  useEffect(() => {
    const createSound = async () => {
      if (surahData && surahData.verses) {
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: surahData.verses[0].audio.primary },
          { shouldPlay: false },
          onPlaybackStatusUpdate
        );
        setSound(newSound);
      }
    };

    createSound();

    return () => {
      if (sound) {
        sound.setOnPlaybackStatusUpdate(null);
      }
    };
  }, [surahData]);

  const onPlaybackStatusUpdate = (status) => {
    if (status.didJustFinish) {
      setPlayingUri(null);
    }
  };

  const tooglePlay = async (audioUri) => {
    if (sound) {
      const status = await sound.getStatusAsync();
      if (playingUri === audioUri) {
        await sound.stopAsync();
        setPlayingUri(null);
        if (status.isLoaded) {
          await sound.unloadAsync();
        }
      } else {
        if (status.isLoaded) {
          await sound.stopAsync();
          await sound.unloadAsync();
        }
        await sound.loadAsync({ uri: audioUri });
        await sound.playAsync();
        setPlayingUri(audioUri);
      }
    }
  };

  const toggleBookmark = async (verseNumber) => {
    let bookmarks = await AsyncStorage.getItem('bookmarks');
    bookmarks = bookmarks ? JSON.parse(bookmarks) : [];
    const isBookmarked = bookmarkedVerses[verseNumber];

    if (isBookmarked) {
      bookmarks = bookmarks.filter((verse) => verse.number !== verseNumber);
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Ayat telah di hapus.',
        visibilityTime: 2000,
      });
    } else {
      bookmarks.push({ number: verseNumber });
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Ayat telah di tandai.',
        visibilityTime: 2000,
      });
    }

    await AsyncStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    const bookmarkMap = {};
    bookmarks.forEach((verse) => {
      bookmarkMap[verse.number] = true;
    });
    setBookmarkedVerses(bookmarkMap);
  };

  const handleTafsir = (verse) => {
    navigation.navigate('Tafsir', {
      verseTafsir: verse.tafsir.id,
      surahName: surahData.name.transliteration.id,
      ayatNumber: verse.number.inSurah,
    });
  };

  if (!surahData || !surahData.verses) {
    return (
      <Text style={{ justifyContent: 'center', alignItems: 'center' }}>
        Loading
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      {surahData.verses.map((verse, index) => (
        <View key={index}>
          <View style={styles.tabContainer}>
            <View style={styles.noAyat}>
              <Text>{verse.number.inSurah}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => handleTafsir(verse)}>
                <Image source={Tafsir} style={{ width: 20, height: 20 }} />
              </TouchableOpacity>
              <Gap width={15} />
              <TouchableOpacity
                onPress={() => tooglePlay(verse.audio.primary)}
                activeOpacity={0.7}
              >
                {playingUri === verse.audio.primary ? (
                  <Image source={Pause} style={{ width: 20, height: 20 }} />
                ) : (
                  <Image source={Play} style={{ width: 20, height: 20 }} />
                )}
              </TouchableOpacity>
              <Gap width={15} />
              <TouchableOpacity
                onPress={() => toggleBookmark(verse.number.inSurah)}
                activeOpacity={0.7}
              >
                {bookmarkedVerses[verse.number.inSurah] ? (
                  <Image
                    source={BookmarkActive}
                    style={{ width: 20, height: 20 }}
                  />
                ) : (
                  <Image
                    source={BookmarkNonActive}
                    style={{ width: 20, height: 20 }}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.ayatContainer}>
            <Text style={styles.arabicAyat}>{verse.text.arab}</Text>
            <Gap height={20} />
            <Text style={{ fontFamily: 'Poppins-Regular' }}>
              {verse.translation.id}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default ListAyat;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    borderBottomColor: '#BBC4CE',
    borderBottomWidth: 1,
    marginHorizontal: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    marginHorizontal: 20,
    paddingHorizontal: 25,
    borderRadius: 20,
    backgroundColor: '#0A2060',
    paddingVertical: 8,
  },
  noAyat: {
    backgroundColor: '#65D6FC',
    width: 'auto',
    paddingHorizontal: 13,
    borderRadius: 50,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ayatContainer: {
    marginHorizontal: 20,
    marginVertical: 15,
  },
  arabicAyat: {
    fontSize: 25,
    color: 'white',
  },
});
