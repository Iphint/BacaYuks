import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
} from 'react-native';
import CardDoa from '../components/CardDoa';
import Search from '../components/Search';

const Doa = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [doaList, setDoaList] = useState([]);
  const [searchText, setSearchText] = useState('');

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          'https://doa-doa-api-ahmadramadhan.fly.dev/api'
        );
        const data = await res.json();
        setDoaList(data);
        console.log(data);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filteredDoaList = doaList.filter((doa) =>
    doa.doa.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {isSearchVisible ? (
          <Search
            placeholder={'Cari doa yang Anda inginkan...'}
            onSearch={(text) => setSearchText(text)}
          />
        ) : (
          <Text style={styles.title}>Doa sehari hari.</Text>
        )}
        <TouchableOpacity onPress={toggleSearch} activeOpacity={0.7}>
          <Text style={styles.searchIcon}>🔍</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginHorizontal: 7 }}
      >
        {filteredDoaList.length === 0 ? (
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>Doa tidak ditemukan.</Text>
          </View>
        ) : (
          filteredDoaList.map((doa) => (
            <CardDoa
              key={doa.id}
              doa={doa.doa}
              ayat={doa.ayat}
              latin={doa.latin}
              artinya={doa.artinya}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: '#455EB5',
    flex: 1,
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
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Doa;