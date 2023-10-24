import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Image } from 'react-native';
import Gap from '../components/atoms/Gap';
import { Point, QuranDetail } from '../assets';
import { useFonts } from 'expo-font';

const CardDetail = ({ surahData }) => {
  let [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
  });

  if (!surahData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#65D6FC" />
        <Text>Loading surah</Text>
      </View>
    );
  }

  const { name, numberOfVerses, revelation } = surahData;

  return (
    <View style={styles.container}>
      <View>
        <Image source={QuranDetail} />
      </View>
      <View style={styles.containerDesc}>
        <Text style={styles.arabicDesc}>{name.short}</Text>
        <Gap height={27} />
        <Text style={styles.title}>{name.translation.id}</Text>
        <View style={styles.descInformation}>
          <Text style={styles.subTitle}>{revelation.id}</Text>
          <Image source={Point} style={{ width: 20, height: 20 }} />
          <Text style={styles.subTitle}>{numberOfVerses} verses</Text>
        </View>
      </View>
    </View>
  );
};

export default CardDetail;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    borderWidth: 1,
    borderColor: '#65D6FC',
    marginHorizontal: 30,
    borderRadius: 10,
    paddingVertical: 40,
    backgroundColor: 'rgba(101, 214, 252, 0.7)',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    overflow: 'hidden',
  },
  descInformation: {
    flexDirection: 'row',
  },
  containerDesc: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  arabicDesc: {
    fontSize: 24,
    color: '#ffff',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 17,
    color: '#ffff',
    fontFamily: 'Poppins-Regular',
  },
  subTitle: {
    fontFamily: 'Poppins-Regular',
    color: '#001C30',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
