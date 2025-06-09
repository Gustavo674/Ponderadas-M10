// src/screens/GameScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import Card from '../components/Card';
import Score from '../components/Score';
import { getCards } from '../services/api';

export default function GameScreen({ navigation }) {
  const [cards, setCards] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchCards = async () => {
      const fetchedCards = await getCards();
      setCards(fetchedCards);
    };

    fetchCards();
  }, []);

  const calculateScore = () => {
    // Por enquanto pontuação aleatória só para exemplo
    setScore(Math.floor(Math.random() * 100));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sua Mão</Text>
      <FlatList
        data={cards}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        renderItem={({ item }) => <Card card={item} />}
      />
      <Score value={score} />
      <Button title="Recalcular Pontuação" onPress={calculateScore} />
      <Button title="Voltar ao Início" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
