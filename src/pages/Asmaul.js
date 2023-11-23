import { FlatList, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';

const Asmaul = () => {
  const [asmaulData, setAsmaulData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://islamic-api-zhirrr.vercel.app/api/asmaulhusna');
        const data = await response.json();
        setAsmaulData(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderAsmaulItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.latin}</Text>
      <Text style={styles.itemText}>{item.arabic}</Text>
      <Text style={styles.itemText}>{item.translation_en}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={asmaulData}
        renderItem={renderAsmaulItem}
        keyExtractor={(item) => item.index}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Asmaul;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#455EB5',
  },
  item: {
    padding: 10,
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});