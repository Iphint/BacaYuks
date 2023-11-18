import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import CardDoa from '../components/CardDoa';
import Search from '../components/Search';

const Doa = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {isSearchVisible ? (
          <Search placeholder={'cari doa yang anda inginkan ...'} />
        ) : (
          <Text style={styles.title}>Doa sehari hari.</Text>
        )}
        <TouchableOpacity onPress={toggleSearch} activeOpacity={0.7}>
          <Text style={styles.searchIcon}>🔍</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: 80 }}
      >
        <CardDoa />
        <CardDoa />
        <CardDoa />
        <CardDoa />
        <CardDoa />
        <CardDoa />
        <CardDoa />
        <CardDoa />
        <CardDoa />
        <CardDoa />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: '#455EB5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: '500',
    color: '#ffff',
  },
  searchIcon: {
    fontSize: 34,
  },
});

export default Doa;
