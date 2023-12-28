import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Point } from '../assets';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';

const QuranListCard = ({ surahData, onPress, isLoading }) => {
  let [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
  });

  const { number, name, revelation, numberOfVerses } = surahData;

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#65D6FC" />
      </View>
    );
  }

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.ayatNumberContainer}>
          <Text style={styles.ayatText}>{number}</Text>
        </View>
        <View style={styles.ayatInfoContainer}>
          <Text style={styles.namaAyat}>{name.transliteration.id}</Text>
          <View style={styles.ayatDesc}>
            <Text style={styles.ayatSubDesc}>{revelation.id}</Text>
            <Image source={Point} style={{ width: 20, height: 20 ,color:'rgba(105, 215, 252, 1)'}} />
            <Text style={styles.ayatSubDesc}>{numberOfVerses} Ayat</Text>
          </View>
        </View>
        <View style={styles.ayatArabicContainer}>
          <Text style={styles.ayatSubDescArabic}>{name.short}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default QuranListCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 4,
    borderTopWidth: 4,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderRadius: 30,
    marginHorizontal: 20,
    paddingVertical: 20,
    marginTop:10,
    marginBottom: 10,
    backgroundColor:'white',
    borderColor: 'rgba(105, 215, 252, 0.8)',
    alignItems: 'center',
  },
  ayatNumberContainer: {
    flex: 1,
    alignItems: 'center',
  },
  ayatInfoContainer: {
    flex: 3,
    paddingHorizontal: 10,
  },
  ayatArabicContainer: {
    flex: 2,
    alignItems: 'center',
  },
  ayatDesc: {
    flexDirection: 'row',
    fontFamily: 'Poppins-Regular',
  },
  ayatText: {
    color: 'rgba(105, 215, 252, 1)',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    
  },
  namaAyat: {
    fontSize: 20,
    color: 'rgba(105, 215, 252, 1)',
    fontFamily: 'Poppins-SemiBold',
  },
  ayatSubDesc: {
    fontSize: 14,
    textTransform: 'uppercase',
    color: 'rgba(30, 30, 30, 0.23)',
    fontFamily: 'Poppins-Regular',
  },
  ayatSubDescArabic: {
    fontSize: 22,
    color: 'rgba(105, 215, 252, 1)',
  },
});
