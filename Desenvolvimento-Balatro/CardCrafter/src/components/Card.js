// src/components/Card.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Card({ card }) {
  return (
    <View style={styles.card}>
      <Text style={styles.rank}>{card.rank}</Text>
      <Text style={styles.suit}>{card.suit}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 80,
    height: 120,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#333',
    backgroundColor: '#fafafa',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  rank: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  suit: {
    fontSize: 18,
    color: '#666',
  },
});
