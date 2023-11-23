import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Gap from '../components/atoms/Gap';
import CustomInputText from '../components/atoms/CustomInputText';
import Button from '../components/atoms/Button';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { QuranLogo } from '../assets';
import { Image } from 'react-native';

const SignUp = () => {
  let [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
  });
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image source={QuranLogo} />
      </View>
      <View style={styles.bluePopUp}/>
      <View style={styles.containerOne}>
        <Text style={styles.title}>Daftar</Text>
        <CustomInputText placeholder={'Email'} />
        <Gap height={30} />
        <CustomInputText placeholder={'Kata Sandi'} isPassword={true} />
        <Gap height={30} />
        <CustomInputText placeholder={'Ulangi Kata Sandi'} isPassword={true} />
        <Gap height={40} />
        <Button button={'Daftar'} />
        <Gap height={20} />
        <View style={styles.haveAccount}>
          <Text style={styles.haveAccountText}>Sudah punya akun?</Text>
          <Gap width={7} />
          <TouchableOpacity onPress={handlePress}>
            <Text style={styles.haveAccountTextLogin}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
  },
  title: {
    paddingLeft:46,
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#69D7FC'
  },
  logo: {
    marginTop: 60,
    alignItems: 'center',
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
