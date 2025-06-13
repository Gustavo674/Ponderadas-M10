// src/screens/HistoryScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ImageBackground, ActivityIndicator } from 'react-native';

export default function HistoryScreen() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://10.128.0.215:3001/games')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setHistory(data.reverse());
        } else {
          console.error('⚠️ Dados inesperados recebidos:', data);
          setHistory([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar histórico:', error);
        setLoading(false);
      });
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemBox}>
      <Text style={styles.itemText}>Rodada: {item.round}</Text>
      <Text style={styles.itemText}>Score: {item.score}</Text>
      <Text style={styles.itemText}>Moedas: {item.coins}</Text>
      <Text style={styles.itemText}>
        Modificadores: {Array.isArray(item.modifiers) ? item.modifiers.join(', ') : 'Nenhum'}
      </Text>
    </View>
  );

  return (
    <ImageBackground
      source={require('../assets/poker_table_bg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>📜 Histórico de Partidas</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#FFD700" />
        ) : history.length === 0 ? (
          <Text style={styles.itemText}>(Nenhuma partida registrada)</Text>
        ) : (
          <FlatList
            data={history}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 20,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 6,
  },
  itemBox: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    width: '100%',
  },
  itemText: {
    color: '#fff',
    fontSize: 16,
  },
});
