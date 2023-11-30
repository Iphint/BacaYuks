import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import CustomInputText from '../components/atoms/CustomInputText';
import Gap from '../components/atoms/Gap';
import Button from '../components/atoms/Button';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { QuranLogo } from '../assets';

const Login = () => {
  let [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
  });
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('SignUp');
  };

  const handleLogin = () => {
    navigation.replace('MainApp');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image source={QuranLogo} />
      </View>
      <View style={styles.bluePopUp}/>
      <View style={styles.containerOne}> 
      <Text style={styles.title}>Masuk</Text>
        <CustomInputText placeholder={'Email'} />
        <Gap height={30} />
        <CustomInputText
          placeholder={'Kata Sandi'}
          isPassword={true}
        />
        <Gap height={40} />
        <TouchableOpacity onPress={handleLogin}>
          <Button button={'Masuk'} />
        </TouchableOpacity>
        <Gap height={20} />
        <View style={styles.haveAccount}>
          <Text style={styles.haveAccountText}>Belum Punya Akun?</Text>
          <Gap width={7} />
          <TouchableOpacity onPress={handlePress}>
            <Text style={styles.haveAccountTextLogin}>Daftar</Text>
          </TouchableOpacity>
        </View>
    </View>
      
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  logo: {
    marginTop: 60,
    alignItems: 'center',
  },
  title: {
    paddingLeft:46,
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#69D7FC'
  },
  textTitle: {
    fontSize: 50,
    color: '#ffff',
    paddingBottom: 24,
    fontFamily: 'Poppins-Regular',
  },
  haveAccount: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  haveAccountText: {
    color: 'rgba(30,30,30, 0.23)',
    fontSize: 15,
  },
  haveAccountTextLogin: {
    color: '#65D6FC',
    fontWeight: 'bold',
    fontSize: 15,
  },
  containerOne: {
    flex: 1,
    marginTop: 60,
    backgroundColor: 'white',
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    paddingTop: 21,
    position: 'relative',
  },
  bluePopUp: {
    backgroundColor: '#69D7FC',
    position: 'absolute',
    width: '100%',
    height: 100,
    marginTop: 320,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
  },
});
