import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import QuranListCard from './QuranListCard';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import QuranPilihan from '../pages/QuranPilihan';

const HomeTabSection = ({ searchQuery }) => {
  const [surahData, setSurahData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleData, setVisibleData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const itemsPerPage = 15;

  useEffect(() => {
    const fetchSurahData = async () => {
      try {
        const response = await axios.get('https://api.quran.gading.dev/surah');
        setSurahData(response.data.data);
        setVisibleData(response.data.data.slice(0, itemsPerPage));
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching surah data:', error);
        setIsLoading(false);
      }
    };

    fetchSurahData();
  }, []);

  const handleLoadMore = () => {
    if (currentPage * itemsPerPage < surahData.length && !isFetchingMore) {
      loadMoreData();
    }
  };

  const getFilteredData = () => {
    if (!searchQuery) return visibleData;
    return visibleData.filter((data) =>
      data.name.transliteration.id
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  };

  const loadMoreData = () => {
    setIsFetchingMore(true);
    setTimeout(() => {
      setCurrentPage((prevPage) => prevPage + 1);
      setVisibleData(surahData.slice(0, (currentPage + 1) * itemsPerPage));
      setIsFetchingMore(false);
    }, 1500);
  };

  const navigation = useNavigation();

  const QuranList = () => {
    const filteredData = getFilteredData();

    const handleCardPress = (number) => {
      navigation.navigate('Detail', { number });
    };

    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#65D6FC" />
          <Text>Loading surah ...</Text>
        </View>
      );
    }

    if (filteredData.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={{ color: '#ffff' }}>
            Data yang Anda cari tidak ditemukan.
          </Text>
        </View>
      );
    }

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        onMomentumScrollEnd={handleLoadMore}
      >
        <View>
          {filteredData.map((data) => (
            <QuranListCard
              key={data.number}
              surahData={data}
              onPress={() => handleCardPress(data.number)}
            />
          ))}
          {isFetchingMore && (
            <View style={styles.loadingMoreContainer}>
              <ActivityIndicator size="small" color="#65D6FC" />
            </View>
          )}
        </View>
      </ScrollView>
    );
  };

  const Bookmark = () => (
    <ScrollView>
      <View>
        <QuranPilihan />
      </View>
    </ScrollView>
  );

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabBarStyle}
      tabStyle={styles.tabStyle}
      renderLabel={({ route, focused }) => (
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            color: focused ? '#65D6FC' : '#D2E0FB',
          }}
        >
          {route.title}
        </Text>
      )}
    />
  );

  const renderScene = SceneMap({
    first: QuranList,
    second: Bookmark,
  });

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Quran List' },
    { key: 'second', title: 'Surah Pilihan' },
  ]);

  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
};

export default HomeTabSection;

const styles = StyleSheet.create({
  indicator: {
    backgroundColor: '#65D6FC',
    height: 4,
    width: '35%',
    marginHorizontal: 30,
  },
  tabBarStyle: {
    backgroundColor: '#455EB5',
    elevation: 0,
    shadowOpacity: 0,
  },
  tabStyle: { width: 200 },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingMoreContainer: {
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
