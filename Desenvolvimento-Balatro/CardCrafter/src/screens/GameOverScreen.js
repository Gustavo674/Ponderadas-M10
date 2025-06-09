// src/screens/GameOverScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function GameOverScreen({ navigation, route }) {
  const { round, coins } = route.params;

  const handleRestart = () => {
    navigation.navigate('Game');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💀 Game Over 💀</Text>
      <Text style={styles.text}>Você chegou até a rodada {round}!</Text>
      <Text style={styles.text}>Moedas acumuladas: {coins} 🪙</Text>

      <Button title="🔄 Jogar Novamente" onPress={handleRestart} />
      <Button title="Voltar ao Início" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
});
