import { Image, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { BrightQuran } from '../assets';
import Search from '../components/Search';
import HomeTabSection from '../components/HomeTabSection';
import Gap from '../components/atoms/Gap';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <View style={styles.container}>
      <View style={styles.swipe}></View>
      <View style={styles.greetingContainer}>
        <Text style={styles.greeting}>Mari membaca Quran Rozzi!</Text>
      </View>
      <View style={styles.preview}>
        <Search
          placeholder={"Cari"}
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
    position: "relative",
    flex: 1,
    backgroundColor: "white",
  },
  greetingContainer: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  swipe: {
    zIndex: 999,
    position: "absolute",
    top: 80,
    left: 0,
    backgroundColor: "rgba(105, 215, 252, 0.8)",
    width: 8,
    borderTopRightRadius: 15,
    borderBottomRightRadius:15,
    height: 100,
  },
  homeTabSection: {
    flex: 2,
  },
  preview: {
    justifyContent: "center",
    alignItems: "center",
    color: "red",
  },
  greeting: {
    paddingTop: 10,
    paddingRight: 30,
    fontSize: 24,
    color: "rgba(105, 215, 252, 1)",
    textAlign: "right",
    fontFamily: "Poppins-Regular",
  },
});
