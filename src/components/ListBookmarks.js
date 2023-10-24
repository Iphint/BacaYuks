import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const ListBookmarks = ({ bookmark, orderNumber }) => {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.content}>{orderNumber}</Text>
        <Text style={styles.content}>{bookmark.meta.page}</Text>
        <Text style={styles.content}>Ayat {bookmark.number.inSurah}</Text>
        <Text style={styles.content}>{bookmark.meta.juz}</Text>
      </View>
    </View>
  );
};

export default ListBookmarks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomColor: 'gray',
    borderBottomWidth: 2,
    marginHorizontal: 20,
    justifyContent: 'center',
  },
  subContainer: {
    marginHorizontal: 20,
    marginVertical: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  content: {
    color: '#ffff',
  },
});
