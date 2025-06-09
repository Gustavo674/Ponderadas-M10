// src/components/Card.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Card({ card }) {
  const isRed = card.suit === '♥️' || card.suit === '♦️';

  return (
    <View style={styles.card}>
      <Text style={[styles.rank, isRed && styles.redText]}>{card.rank}</Text>
      <Text style={[styles.suit, isRed && styles.redText]}>{card.suit}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 80,
    height: 120,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#333',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  rank: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  suit: {
    fontSize: 20,
  },
  redText: {
    color: 'red',
  },
});
