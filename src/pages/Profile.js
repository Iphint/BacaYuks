import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { Emoji } from '../assets/icons';
import Gap from '../components/atoms/Gap';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const savedUserData = await AsyncStorage.getItem('userSession');
        if (savedUserData !== null) {
          setUserData(JSON.parse(savedUserData));
        }
      } catch (e) {
        console.error('Failed to load user data:', e);
      }
    };

    fetchUserData();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Gap height={40} />
        <Image source={Emoji} style={styles.profile} />
        <Gap height={40} />
        {userData && (
          <View style={styles.def}>
            <Text style={styles.text}>Hallo, {userData.name}</Text>
            <Gap height={20} />
            <Text style={styles.text}>{userData.email}</Text>
          </View>
        )}
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
  def: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
