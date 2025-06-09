// src/screens/GameScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert } from 'react-native';
import Card from '../components/Card';
import Score from '../components/Score';
import { getCards } from '../services/api';

// Lista de modificadores possíveis
const modifiersList = [
  { id: 1, name: "+50% pontos totais", key: 'bonusMultiplier' },
  { id: 2, name: "+20 por ♠️", key: 'bonusSpades' },
  { id: 3, name: "J/Q/K valem 10", key: 'faceCardsBoost' },
];

export default function GameScreen({ navigation }) {
  const [cards, setCards] = useState([]);
  const [score, setScore] = useState(0);
  const [modifiers, setModifiers] = useState({
    bonusMultiplier: false,
    bonusSpades: false,
    faceCardsBoost: false,
  });
  const [currentModifier, setCurrentModifier] = useState(null);
  const [targetScore, setTargetScore] = useState(50);
  const [currentRound, setCurrentRound] = useState(1);

  // Função para sortear uma nova mão
  const fetchNewHand = async () => {
    const fetchedCards = await getCards();
    setCards(fetchedCards);
    setScore(0);
    setModifiers({
      bonusMultiplier: false,
      bonusSpades: false,
      faceCardsBoost: false,
    });

    // Sorteia um modificador aleatório
    const randomMod = modifiersList[Math.floor(Math.random() * modifiersList.length)];
    setCurrentModifier(randomMod);
  };

  // Carrega a primeira mão ao abrir a tela
  useEffect(() => {
    fetchNewHand();
  }, []);

  // Calcula a pontuação da mão atual
  const calculateScore = () => {
    let total = 0;
    cards.forEach(card => {
      if (card.rank === 'A') total += 10;
      else if (card.rank === 'K' || card.rank === 'Q' || card.rank === 'J') {
        total += modifiers.faceCardsBoost ? 10 : 5;
      } else {
        total += parseInt(card.rank);
      }

      if (modifiers.bonusSpades && card.suit === '♠️') {
        total += 20;
      }
    });

    if (modifiers.bonusMultiplier) {
      total = Math.floor(total * 1.5);
    }

    setScore(total);
    return total;
  };

  // Verifica se passou de rodada
  const checkRoundProgression = (calculatedScore) => {
    if (calculatedScore >= targetScore) {
      Alert.alert(
        "Parabéns!",
        `Você passou para a próxima rodada!\n\nPontuação: ${calculatedScore} pts`,
        [
          {
            text: "Continuar",
            onPress: () => {
              setCurrentRound(prev => prev + 1);
              setTargetScore(prev => prev + 20);
              fetchNewHand();
            }
          }
        ]
      );
    } else {
      Alert.alert(
        "Pontuação insuficiente",
        `Você fez ${calculatedScore} pts. Precisa de ${targetScore} pts.\n\nTente novamente!`
      );
    }
  };

  // Clicar em "Jogar Rodada"
  const playRound = () => {
    const calculatedScore = calculateScore();
    checkRoundProgression(calculatedScore);
  };

  // Clicar em "Aplicar Modificador"
  const applyModifier = () => {
    if (currentModifier) {
      setModifiers(prev => ({ ...prev, [currentModifier.key]: true }));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rodada: {currentRound} | Alvo: {targetScore} pts</Text>

      <Text style={styles.subtitle}>Sua Mão</Text>
      <FlatList
        data={cards}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        renderItem={({ item }) => <Card card={item} />}
      />

      <Score value={score} />

      <Button title="Jogar Rodada" onPress={playRound} />

      {currentModifier && (
        <Button
          title={modifiers[currentModifier.key] ? `${currentModifier.name} Ativado!` : `Aplicar: ${currentModifier.name}`}
          onPress={applyModifier}
          disabled={modifiers[currentModifier.key]}
        />
      )}

      <Button title="Nova Mão" onPress={fetchNewHand} />
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
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 10,
  },
});
