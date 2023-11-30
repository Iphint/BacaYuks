import { StyleSheet, View , Text } from 'react-native';
import React, { useState } from 'react';
import Search from '../components/Search';
import HomeTabSection from '../components/HomeTabSection';
import Gap from '../components/atoms/Gap';
import { useFonts } from 'expo-font'
const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  let [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
  });
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <View style={styles.container}>
      <View style={styles.swipe}></View>
      <View style={styles.greetingContainer}>
        <Text style= {styles.greeting}>
          Mari membaca Quran 'Username'!
        </Text>
      </View>
      <View style={styles.preview}>
        <Search
          placeholder={'Cari'}
          onSearch={handleSearch}
          value={searchQuery}
        />
      </View>
      <Gap height={20} />
      <View style={styles.homeTabSection}>
        <HomeTabSection searchQuery={searchQuery} />
      </View>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: 'white',
  },
  greetingContainer: {
    flex: 1, 
    backgroundColor: 'white',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  swipe: {
    position: 'absolute',
    color: "red",
    marginTop: 200,
    width: 20,
    height: 20,
  },
  homeTabSection: {
    flex: 2,
  },
  preview: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'red',
  },
  greeting: {
    paddingTop: 10,
    paddingRight: 30,
    fontSize: 24,
    color: 'rgba(105, 215, 252, 1)',
    textAlign: 'right',
    fontFamily: 'Poppins-Regular',
  }
});
