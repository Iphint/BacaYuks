import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';

const Dzikir = () => {
  const [count, setCount] = useState(0);

  const setIncrement = () => {
    setCount(count + 1);
  };
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={setIncrement}
      style={styles.fullScreen}
    >
      <View style={styles.container}>
        <View style={styles.containerTotal}>
          <Text style={styles.text}>{count}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Dzikir;

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#455EB5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerTotal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 140,
  },
});
