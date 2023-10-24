import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import {
  GestureHandlerRootView,
  ScrollView,
} from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';

const Tafsir = ({ route }) => {
  let [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
  });

  const { verseTafsir, surahName, ayatNumber } = route.params;
  const [showDescription, setShowDescription] = useState(true);
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.tafsirContainer}>
        <Text style={styles.tafsirTitle}>
          {`Surah ${surahName} ayat ${ayatNumber}`}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowDescription(!showDescription)}
      >
        <Text style={styles.buttonText}>
          {showDescription ? 'Hide Description' : 'Show Description'}
        </Text>
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>
        {showDescription && (
          <>
            <View>
              <Text style={styles.tafsirDesc}>Tafsir pendek</Text>
              <Text style={styles.tafsirDescDetail}>{verseTafsir.short}</Text>
            </View>
            <View>
              <Text style={styles.tafsirDesc}>Tafsir panjang</Text>
              <Text style={styles.tafsirDescDetail}>{verseTafsir.long}</Text>
            </View>
          </>
        )}
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default Tafsir;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#455EB5',
  },
  tafsirContainer: {
    marginTop: 30,
    borderWidth: 1,
    borderColor: '#454EB5',
    paddingVertical: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#454EB5',
  },
  tafsirTitle: {
    textAlign: 'center',
    color: '#ffff',
    fontSize: 23,
    fontFamily: 'Poppins-Regular',
  },
  tafsirDesc: {
    fontSize: 20,
    color: '#ffff',
    marginHorizontal: 20,
    marginVertical: 20,
    fontFamily: 'Poppins-SemiBold',
  },
  tafsirDescDetail: {
    marginHorizontal: 20,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#DAFFFB',
    borderRadius: 10,
    fontFamily: 'Poppins-Regular',
  },
  button: {
    backgroundColor: '#176B87',
    padding: 10,
    borderRadius: 10,
    margin: 20,
    alignItems: 'center',
    marginHorizontal: 100,
  },
  buttonText: {
    color: '#FFFF',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
  },
});
