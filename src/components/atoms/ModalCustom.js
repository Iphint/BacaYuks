import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import { Emoji } from '../../assets';
import Gap from './Gap';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ModalCustom = ({ isModalVisible, setModalVisible }) => {
  const navigation = useNavigation();

  const confirmLogout = async () => {
    navigation.navigate('Login');
    try {
      await AsyncStorage.removeItem('userSession');
      navigation.navigate('Login');
    } catch (e) {
      console.error('Error on logout:', e);
    }
  };

  const declineLogout = () => {
    setModalVisible(false);
  };
  return (
    <Modal isVisible={isModalVisible}>
      <View style={styles.modalContent}>
        <Image source={Emoji} style={{ width: 80, height: 80 }} />
        <Gap height={20} />
        <Text style={styles.modalText}>Are you sure you want to logout?</Text>
        <View style={styles.modalButtons}>
          <TouchableOpacity
            style={[styles.modalButton, styles.buttonDecline]}
            onPress={declineLogout}
          >
            <Text style={styles.buttonText}>No</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modalButton, styles.buttonConfirm]}
            onPress={confirmLogout}
          >
            <Text style={styles.buttonTextConfirm}>Yes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalCustom;

const styles = StyleSheet.create({
  modalContent: {
    flex: 0.3,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    margin: 5,
  },
  buttonDecline: {
    backgroundColor: '#ccc',
  },
  buttonConfirm: {
    backgroundColor: '#e74c3c',
  },
  buttonText: {
    color: '#333',
    fontFamily: 'Poppins-SemiBold',
  },
  buttonTextConfirm: {
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
  },
});
