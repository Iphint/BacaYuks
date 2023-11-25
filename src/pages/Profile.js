// screens/Profile.js
import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { Emoji } from '../assets/icons';
import Gap from '../components/atoms/Gap';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import ToggleSwitch from '../components/atoms/ToogleSwitch';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);

  const prayerTimes = {
    Fajr: '05:00',
    Dhuhr: '12:00',
    Asr: '15:30',
    Maghrib: '18:45',
    Isha: '20:00'
  };
  

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const savedUserData = await AsyncStorage.getItem('userSession');
        if (savedUserData !== null) {
          setUserData(JSON.parse(savedUserData));
        }
  
        const notificationEnabled = await AsyncStorage.getItem('isNotificationEnabled');
        const isNotifEnabled = notificationEnabled !== null ? JSON.parse(notificationEnabled) : false;
        setIsNotificationEnabled(isNotifEnabled);
  
        if (isNotifEnabled) {
          await scheduleDailyNotifications();
        }
      } catch (e) {
        console.error('Failed to initialize app:', e);
      }
    };
  
    initializeApp();
  }, []);

  const scheduleDailyNotifications = async () => {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();

      Object.entries(prayerTimes).forEach(async ([prayerName, time]) => {
        const [hour, minute] = time.split(':').map(Number);
        await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Baca Quran Sekarang!',
            body: `Waktunya membaca Quran. Waktu ${prayerName}`,
            sound: 'default',
          },
          trigger: {
            hour,
            minute,
            repeats: true,
          },
        });
      });
    } catch (error) {
      console.error('Error scheduling notifications:', error);
    }
  };

  const handleToggleNotification = async (value) => {
    setIsNotificationEnabled(value);
    await AsyncStorage.setItem('isNotificationEnabled', JSON.stringify(value));

    if (value) {
      await registerForPushNotificationsAsync();
      await scheduleDailyNotifications();
    } else {
      await Notifications.cancelAllScheduledNotificationsAsync();
    }
  };

  const registerForPushNotificationsAsync = async () => {
    try {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        const { status: newStatus } =
          await Notifications.requestPermissionsAsync();
        if (newStatus !== 'granted') {
          alert('Failed to get push token for push notification!');
          return;
        }
      }

      const expoPushToken = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(expoPushToken);
    } catch (error) {
      console.error('Error registering for push notifications:', error);
    }
  };

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
            <Gap height={20} />
            <Text style={{ color: '#fff' }}>Enable notification</Text>
            <ToggleSwitch
              isNotificationEnabled={isNotificationEnabled}
              onToggle={handleToggleNotification}
            />
          </View>
        )}
      </View>
    </View>
  );
};

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

export default Profile;
