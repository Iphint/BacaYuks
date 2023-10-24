import React from 'react';
import { Image } from 'react-native';
import { View, Text, TouchableOpacity } from 'react-native';
import { ArrowBack } from '../../assets';

const CustomHeader = ({ title, onBack }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        paddingTop: 30,
        paddingLeft: 20,
        backgroundColor: '#D0D4CA',
      }}
    >
      {onBack && (
        <TouchableOpacity onPress={onBack} style={{ marginRight: 10 }}>
          <Image source={ArrowBack} style={{ width: 25, height: 25 }} />
        </TouchableOpacity>
      )}
      <Text style={{ fontSize: 20, fontFamily: 'Poppins-SemiBold' }}>
        {title}
      </Text>
    </View>
  );
};

export default CustomHeader;
