import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Search from '../components/Search';
import Gap from '../components/atoms/Gap';
import MapView, { Marker } from 'react-native-maps';
import { Map, PersonMarker } from '../assets';
import * as Location from 'expo-location';

const Maps = () => {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('Loading address...');
  const [modalVisible, setModalVisible] = useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
          console.error('Permission to access location was denied');
          return;
        }

        let locationData = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: locationData.coords.latitude,
          longitude: locationData.coords.longitude,
        });

        mapRef.current.animateToRegion({
          latitude: locationData.coords.latitude,
          longitude: locationData.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });

        // Reverse geocode to get address
        let addresses = await Location.reverseGeocodeAsync(locationData.coords);
        if (addresses && addresses.length > 0) {
          setAddress(addresses[0].street + ', ' + addresses[0].city);
        }
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Gap height={15} />
      <View style={styles.maps}>
        <Image source={Map} style={{ width: 20, height: 20 }} />
        <Gap width={10} />
        <Text style={{ color: '#ffff' }}>{address}</Text>
      </View>
      <Gap height={20} />
      <View style={styles.containerMap}>
        <MapView ref={mapRef} style={styles.map}>
          {location && (
            <Marker coordinate={location} onPress={() => setModalVisible(true)}>
              <Image source={PersonMarker} style={{ width: 50, height: 50 }} />
            </Marker>
          )}
        </MapView>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hallo saya disini</Text>
            <TouchableOpacity
              style={{ ...styles.openButton, backgroundColor: 'red' }}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    marginTop: 15,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
  },
});
