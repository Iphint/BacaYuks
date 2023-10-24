import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import CardDetail from '../components/CardDetail';
import ListAyat from '../components/ListAyat';
import axios from 'axios';

const Detail = ({ route }) => {
  const surahData = route.params;
  const [fetchedData, setFetchedData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const surahNumber = surahData.number;
        const apiUrl = `https://api.quran.gading.dev/surah/${surahNumber}`;
        const response = await axios.get(apiUrl);
        setFetchedData(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };
  
    if (surahData) {
      fetchData();
    }
  }, [surahData]);
  

  return (
    <View style={styles.container}>
      <CardDetail surahData={fetchedData} />
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#65D6FC" />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <ListAyat surahData={fetchedData} />
        </ScrollView>
      )}
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6676F5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
