// src/screens/GameScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert } from 'react-native';
import Card from '../components/Card';
import Score from '../components/Score';
import { getCards } from '../services/api';

const modifiersList = [
  { id: 1, name: "+50% pontos totais", key: 'bonusMultiplier' },
  { id: 2, name: "+20 por ♠️", key: 'bonusSpades' },
  { id: 3, name: "J/Q/K valem 10", key: 'faceCardsBoost' },
  { id: 4, name: "+10 pontos fixos", key: 'bonusFlat10' },
  { id: 5, name: "+5 por carta vermelha", key: 'bonusRedCards' },
  { id: 6, name: "Cartas 2-5 valem 10", key: 'bonusLowCards' },
  { id: 7, name: "A valem 20", key: 'bonusAce20' },
  { id: 8, name: "+1 reroll extra", key: 'bonusReroll' },
];

export default function GameScreen({ navigation }) {
  const [cards, setCards] = useState([]);
  const [score, setScore] = useState(0);
  const [modifiers, setModifiers] = useState({
    bonusMultiplier: false,
    bonusSpades: false,
    faceCardsBoost: false,
    bonusFlat10: false,
    bonusRedCards: false,
    bonusLowCards: false,
    bonusAce20: false,
    bonusReroll: false,
  });
  const [currentModifier, setCurrentModifier] = useState(null);
  const [targetScore, setTargetScore] = useState(50);
  const [currentRound, setCurrentRound] = useState(1);

  const BASE_REROLLS = 3;
  const [rerollsLeft, setRerollsLeft] = useState(BASE_REROLLS);

  const [coins, setCoins] = useState(0);
  const [ownedModifiers, setOwnedModifiers] = useState([]);

  const fetchNewHand = async () => {
    const fetchedCards = await getCards();
    setCards(fetchedCards);
    setScore(0);

    setModifiers(prev => ({
      ...prev,
      bonusMultiplier: false,
      bonusSpades: false,
      faceCardsBoost: false,
      bonusFlat10: false,
      bonusRedCards: false,
      bonusLowCards: false,
      bonusAce20: false,
      bonusReroll: false,
    }));

    const randomMod = modifiersList[Math.floor(Math.random() * modifiersList.length)];
    setCurrentModifier(randomMod);

    // Se tiver bonusReroll, +1 reroll, senão normal
    setRerollsLeft(BASE_REROLLS + (modifiers.bonusReroll ? 1 : 0));
  };

  useEffect(() => {
    fetchNewHand();
  }, []);

  const rerollHand = async () => {
    if (rerollsLeft > 0) {
      const fetchedCards = await getCards();
      setCards(fetchedCards);
      setScore(0);
      setRerollsLeft(prev => prev - 1);
    } else {
      Alert.alert("Sem rerolls!", "Você já usou todos os rerolls desta rodada.");
    }
  };

  const calculateScore = () => {
    let total = 0;
    cards.forEach(card => {
      let cardValue = 0;

      // Ace
      if (card.rank === 'A') {
        cardValue = modifiers.bonusAce20 ? 20 : 10;
      }
      // Face cards
      else if (card.rank === 'K' || card.rank === 'Q' || card.rank === 'J') {
        cardValue = modifiers.faceCardsBoost ? 10 : 5;
      }
      // Low cards 2-5
      else if (['2', '3', '4', '5'].includes(card.rank)) {
        cardValue = modifiers.bonusLowCards ? 10 : parseInt(card.rank);
      }
      // Normal cards
      else {
        cardValue = parseInt(card.rank);
      }

      total += cardValue;

      // Mod: +20 por ♠️
      if (modifiers.bonusSpades && card.suit === '♠️') {
        total += 20;
      }

      // Mod: +5 por carta vermelha
      if (modifiers.bonusRedCards && (card.suit === '♥️' || card.suit === '♦️')) {
        total += 5;
      }
    });

    // Mod: +10 fixo
    if (modifiers.bonusFlat10) {
      total += 10;
    }

    // Mod: +50%
    if (modifiers.bonusMultiplier) {
      total = Math.floor(total * 1.5);
    }

    setScore(total);
    return total;
  };

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
              setCoins(prev => prev + 10);
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

  const playRound = () => {
    const calculatedScore = calculateScore();
    checkRoundProgression(calculatedScore);
  };

  const applyModifier = () => {
    if (currentModifier) {
      setModifiers(prev => ({ ...prev, [currentModifier.key]: true }));

      // Se for bonusReroll, dá +1 reroll imediatamente
      if (currentModifier.key === 'bonusReroll') {
        setRerollsLeft(prev => prev + 1);
      }
    }
  };

  const openShop = () => {
    navigation.navigate('Shop', {
      coins,
      setCoins,
      ownedModifiers,
      setOwnedModifiers,
    });
  };

  const resetGame = () => {
    setCurrentRound(1);
    setTargetScore(50);
    setCoins(0);
    setOwnedModifiers([]);
    fetchNewHand();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rodada: {currentRound} | Alvo: {targetScore} pts</Text>
      <Text style={styles.coins}>🪙 Moedas: {coins}</Text>

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

      <Button title={`Nova Mão (${rerollsLeft} rerolls)`} onPress={rerollHand} />

      <Button title="Abrir Loja" onPress={openShop} />

      <Text style={styles.subtitle}>Modificadores Comprados:</Text>
      {ownedModifiers.length === 0 && <Text>(Nenhum)</Text>}
      {ownedModifiers.map((mod, index) => (
        <Button
          key={index}
          title={modifiers[mod.key] ? `${mod.name} Ativado!` : `Usar: ${mod.name}`}
          onPress={() => {
            setModifiers(prev => ({ ...prev, [mod.key]: true }));

            if (mod.key === 'bonusReroll') {
              setRerollsLeft(prev => prev + 1);
            }
          }}
          disabled={modifiers[mod.key]}
        />
      ))}

      <Button title="🔄 Reiniciar Jogo" onPress={resetGame} />
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
  coins: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 10,
  },
});
