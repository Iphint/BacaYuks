import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

const Dzikir = () => {
  const [count, setCount] = useState(0);

  const setIncrement = () => {
    setCount(count + 1);
  };

  const resetCount = () => {
    setCount(0);
  };

  return (
    <View style={styles.fullScreen}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={setIncrement}
        style={styles.container}
      >
        <View style={styles.containerTotal}>
          <Text style={styles.text}>{count}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={resetCount} style={styles.resetButton}>
        <Text style={styles.resetButtonText}>Reset Dzikir</Text>
      </TouchableOpacity>
    </View>
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
    color: '#ffffff',
  },
  resetButton: {
    backgroundColor: '#3498db',
    padding: 15,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#ffffff',
    fontSize: 18,
  },
});