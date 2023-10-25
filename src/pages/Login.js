import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import CustomInputText from '../components/atoms/CustomInputText';
import Gap from '../components/atoms/Gap';
import Button from '../components/atoms/Button';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';

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
    navigation.navigate('MainApp');
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.textTitle}>Sign In</Text>
      </View>
      <CustomInputText title={'Email'} placeholder={'Masukan email anda...'} />
      <Gap height={30} />
      <CustomInputText
        title={'Password'}
        placeholder={'Masukan password anda...'}
        isPassword={true}
      />
      <Gap height={40} />
      <TouchableOpacity onPress={handleLogin}>
        <Button button={'Sign In'} />
      </TouchableOpacity>
      <Gap height={20} />
      <View style={styles.haveAccount}>
        <Text style={styles.haveAccountText}>Don't have an account !!</Text>
        <Gap width={7} />
        <TouchableOpacity onPress={handlePress}>
          <Text style={styles.haveAccountTextLogin}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#455EB5',
  },
  title: {
    marginTop: 60,
    borderBottomWidth: 2,
    alignItems: 'center',
    marginHorizontal: 70,
    borderBottomColor: '#65D6FC',
    marginBottom: 30,
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
    color: '#ffff',
    fontSize: 15,
  },
  haveAccountTextLogin: {
    color: '#65D6FC',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
