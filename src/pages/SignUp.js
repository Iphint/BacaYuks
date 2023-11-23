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
      <View style={styles.bluePopUp}></View>
      <View style={styles.containerOne}>
      <CustomInputText
      placeholder={'Email'} />
      <Gap height={30} />
      <CustomInputText
        placeholder={'Kata Sandi'}
        isPassword={true}
      />
      <Gap height={30} />
      <CustomInputText
        placeholder={'Ulangi Kata Sandi'}
        isPassword={true}
      />
      <Gap height={40} />
      <Button button={'Sign up'} />
      <Gap height={20} />
      <View style={styles.haveAccount}>
        <Text style={styles.haveAccountText}>Already have an account !</Text>
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
    backgroundColor: 'black',
    position: 'relative'
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
    color: '#ffff',
    fontSize: 15,
  },
  haveAccountTextLogin: {
    color: '#65D6FC',
    fontWeight: 'bold',
    fontSize: 15,
  },
  containerOne: {
    backgroundColor: "white",
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    zIndex: 2,
    position: 'relative',
  },
  
  bluePopUp: {
    backgroundColor: "red",
    height: 40,
    top: 0,
    right: 0,
    
    position: 'absolute', 
    zIndex: 1, 
  }
});
