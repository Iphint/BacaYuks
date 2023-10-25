import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Button = ({ button }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{button}</Text>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    borderColor: '#65D6FC',
    backgroundColor: '#65D6FC',
  },
  text: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    textTransform: 'uppercase',
    textAlign: 'center',
    color: '#ffff',
    fontWeight: 'bold',
  },
});
