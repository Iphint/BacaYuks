import { Image, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import { LogoQuran, Quran, SplashBawah } from '../assets';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation()
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);
  return (
    <View style={styles.container}>
      <View style={styles.iconSplash}>
        <Image source={Quran} style={{ marginBottom: -157 }} />
        <Image source={LogoQuran} style={{ width: 400, height: 400 }} />
      </View>
      <View style={styles.splashBawahContainer}>
        <Image source={SplashBawah} />
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#112095',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconSplash: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashBawahContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
