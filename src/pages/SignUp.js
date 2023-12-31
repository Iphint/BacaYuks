import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMutation, useQuery } from '@apollo/client';
import Gap from '../components/atoms/Gap';
import CustomInputText from '../components/atoms/CustomInputText';
import Button from '../components/atoms/Button';
import { CHECK_USER_EXISTS, INSERT_USER } from '../utils/Mutation';
import { Alert } from 'react-native';

const SignUp = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [tambahUser, { data, loading, error }] = useMutation(INSERT_USER);
  const {
    data: userData,
    loading: checkingUserLoading,
    refetch,
  } = useQuery(CHECK_USER_EXISTS, {
    variables: { email },
    skip: !email,
  });

  const validateEmail = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handlePress = async () => {
    if (checkingUserLoading) {
      return;
    }

    // Validasi input tidak boleh kosong
    if (!name || !email || !password || !repeatPassword) {
      Alert.alert('Error', 'Semua input harus diisi.');
      return;
    }

    // Validasi email dan password
    if (!validateEmail(email)) {
      Alert.alert('Error', 'Format email tidak valid.');
      return;
    }

    if (!validatePassword(password)) {
      Alert.alert('Error', 'Password harus minimal 8 karakter.');
      return;
    }

    // Validasi apakah password dan repeatPassword sama
    if (password !== repeatPassword) {
      Alert.alert('Error', 'Password dan Repeat password harus sama.');
      return;
    }

    try {
      // Pertama, lakukan refetch untuk memperoleh data terbaru
      const checkResult = await refetch();

      // Cek apakah pengguna sudah ada
      if (checkResult.data && checkResult.data.user.length > 0) {
        Alert.alert('Error', 'Email sudah terdaftar, gunakan email yang lain.');
        return;
      }

      // Jika pengguna belum terdaftar, lanjutkan proses pendaftaran
      const response = await tambahUser({
        variables: {
          name: name,
          email: email,
          password: password,
        },
      });

      if (response.data) {
        console.log('User berhasil ditambahkan:', response.data);
        const newUser = response.data.insert_user.returning[0];
        console.log('Detail User:', newUser);
        Alert.alert('Success', 'User berhasil ditambahkan!');
        setName('');
        setEmail('');
        setPassword('');
        setRepeatPassword('');
        navigation.navigate('Login');
      }
    } catch (error) {
      console.error('Error saat menambahkan user:', error);
      Alert.alert('Error', 'Gagal menambahkan user. Silakan coba lagi.');
    }
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.textTitle}>Sign Up</Text>
      </View>
      <CustomInputText
        title={'Name'}
        placeholder={'Name ...'}
        onChangeText={setName}
        value={name}
      />
      <Gap height={30} />
      <CustomInputText
        title={'Email'}
        placeholder={'Email ...'}
        onChangeText={setEmail}
        value={email}
      />
      <Gap height={30} />
      <CustomInputText
        title={'Password'}
        placeholder={'Password ...'}
        onChangeText={setPassword}
        value={password}
        isPassword={true}
      />
      <Gap height={30} />
      <CustomInputText
        title={'Repeat password'}
        placeholder={'Repeat password ...'}
        onChangeText={setRepeatPassword}
        value={repeatPassword}
        isPassword={true}
      />
      <Gap height={40} />
      <TouchableOpacity onPress={handlePress}>
        <Button button={'Sign up'} />
      </TouchableOpacity>
      <Gap height={20} />
      <View style={styles.haveAccount}>
        <Text style={styles.haveAccountText}>Already have an account !</Text>
        <Gap width={7} />
        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.haveAccountTextLogin}>Login</Text>
        </TouchableOpacity>
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
