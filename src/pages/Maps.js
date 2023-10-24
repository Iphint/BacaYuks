import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Search from '../components/Search';
import Gap from '../components/atoms/Gap';
import MapView from 'react-native-maps';
import { Map } from '../assets';

const Maps = () => {
  return (
    <View style={styles.container}>
      <Gap height={40} />
      <Search placeholder={'Cari masjid terdekat...'} />
      <Gap height={10} />
      <View style={styles.maps}>
        <Image source={Map} style={{ width: 20, height: 20 }} />
        <Gap width={10}/>
        <Text>Jakarta 12. 94 Jl Thamrin</Text>
      </View>
      <Gap height={20} />
      <View style={styles.containerMap}>
        <MapView style={styles.map} />
      </View>
    </View>
  );
};

export default Maps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#455EB5',
  },
  containerMap: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  maps: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
