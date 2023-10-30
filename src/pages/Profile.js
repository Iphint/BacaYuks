import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Image } from 'react-native';
import { Emoji } from '../assets/icons';
import Gap from '../components/atoms/Gap';

const Profile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Gap height={40} />
        <Image source={Emoji} style={styles.profile} />
        <Gap height={40} />
        <Text style={styles.text}>zaynm7719@gmail.com</Text>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#455EB5',
  },
  subContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profile: {
    width: 200,
    height: 200,
  },
  text: {
    color: '#ffff',
    fontSize: 20,
  },
});
