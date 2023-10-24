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
      <View style={styles.preview}>
        <Image source={BrightQuran} />
        <Search
          placeholder={'Search here...'}
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
    flex: 1,
    backgroundColor: '#455EB5',
  },
  homeTabSection: {
    flex: 1,
  },
  preview: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
