import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { LogoQuran, Logout } from '../assets';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Gap from './atoms/Gap';
import { useFonts } from 'expo-font';
import ModalCustom from './atoms/ModalCustom';

const CustomDrawer = (props) => {
  const [isModalVisible, setModalVisible] = useState(false);
  let [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
  });

  if (!fontsLoaded) {
    return <Text>Loading fonts</Text>;
  }

  const handleLogout = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={LogoQuran} style={styles.imagePerson} />
        <View style={styles.textContainer}>
          <Text style={styles.textContent}>Quran Kareem</Text>
          <Text style={styles.textContent}>With Multiple Translation</Text>
        </View>
      </View>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.drawerContent}
      >
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={styles.version}>
        <Text style={{ fontFamily: 'Poppins-Regular' }}>build version 1.0</Text>
      </View>
      <Gap height={17} />
      <TouchableOpacity activeOpacity={0.7}>
        <View style={styles.logoutContainer}>
          <TouchableOpacity
            onPress={handleLogout}
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image source={Logout} style={{ width: 25, height: 25 }} />
            <Gap width={10} />
            <Text style={{ fontFamily: 'Poppins-SemiBold', color: 'red' }}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <ModalCustom
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imagePerson: {
    width: 200,
    height: 200,
    borderRadius: 50,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#455EB5',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -45,
    marginBottom: 30,
  },
  textContent: {
    color: 'white',
    fontFamily: 'Poppins-Regular',
  },
  drawerContent: {
    flex: 1,
    backgroundColor: 'white',
  },
  logoutContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  version: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
