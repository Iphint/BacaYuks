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

    // Validasi email dan password
    if (!validateEmail(email)) {
      Alert.alert('Error', 'Format email tidak valid.');
      return;
    }

    if (!validatePassword(password)) {
      Alert.alert('Error', 'Password harus minimal 8 karakter.');
      return;
    }

    try {
      // Pertama, lakukan refetch untuk memperoleh data terbaru
      const checkResult = await refetch();

      // Cek apakah pengguna sudah ada
      if (checkResult.data && checkResult.data.user.length > 0) {
        Alert.alert('Error', 'Email sudah terdaftar.');
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
