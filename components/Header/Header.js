import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Expo icons

export default function Header() {
  return (
    <View style={styles.container}>
      <Ionicons name="arrow-back" size={28} color="#111" />
      <Text style={styles.title}>Chris' Full Body 1</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f2f7',
    top:10
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
    color: '#000',
  },
});
