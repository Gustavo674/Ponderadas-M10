// src/components/Score.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Score({ value }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Pontuação:</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 24,
    color: '#007aff',
    fontWeight: 'bold',
  },
});
