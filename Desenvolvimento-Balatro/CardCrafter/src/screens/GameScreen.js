// src/screens/GameScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert, ImageBackground, ScrollView } from 'react-native';
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

      if (card.rank === 'A') {
        cardValue = modifiers.bonusAce20 ? 20 : 10;
      } else if (card.rank === 'K' || card.rank === 'Q' || card.rank === 'J') {
        cardValue = modifiers.faceCardsBoost ? 10 : 5;
      } else if (['2', '3', '4', '5'].includes(card.rank)) {
        cardValue = modifiers.bonusLowCards ? 10 : parseInt(card.rank);
      } else {
        cardValue = parseInt(card.rank);
      }

      total += cardValue;

      if (modifiers.bonusSpades && card.suit === '♠️') {
        total += 20;
      }

      if (modifiers.bonusRedCards && (card.suit === '♥️' || card.suit === '♦️')) {
        total += 5;
      }
    });

    if (modifiers.bonusFlat10) {
      total += 10;
    }

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
      navigation.navigate('GameOver', {
        round: currentRound,
        coins: coins,
      });
    }
  };

  const playRound = () => {
    const calculatedScore = calculateScore();
    checkRoundProgression(calculatedScore);
  };

  const applyModifier = () => {
    if (currentModifier) {
      setModifiers(prev => ({ ...prev, [currentModifier.key]: true }));

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
    <ImageBackground
      source={require('../assets/poker_table_bg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>🎲 Rodada {currentRound} | 🎯 Alvo: {targetScore} pts</Text>
        <Text style={styles.coins}>🪙 Moedas: {coins}</Text>

        <Text style={styles.subtitle}>🃏 Sua Mão</Text>
        <FlatList
          data={cards}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          contentContainerStyle={styles.cardList}
          renderItem={({ item }) => <Card card={item} />}
        />

        <Score value={score} />

        <TouchableOpacity style={styles.button} onPress={playRound}>
          <Text style={styles.buttonText}>🎮 Jogar Rodada</Text>
        </TouchableOpacity>

        {currentModifier && (
          <TouchableOpacity
            style={styles.button}
            onPress={applyModifier}
            disabled={modifiers[currentModifier.key]}
          >
            <Text style={styles.buttonText}>
              {modifiers[currentModifier.key] ? `${currentModifier.name} Ativado!` : `Aplicar: ${currentModifier.name}`}
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.button} onPress={rerollHand}>
          <Text style={styles.buttonText}>🔄 Nova Mão ({rerollsLeft} rerolls)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={openShop}>
          <Text style={styles.buttonText}>🛒 Abrir Loja</Text>
        </TouchableOpacity>

        <Text style={styles.subtitle}>✨ Modificadores Comprados:</Text>
        {ownedModifiers.length === 0 && <Text style={styles.text}>(Nenhum)</Text>}
        {ownedModifiers.map((mod, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => {
              setModifiers(prev => ({ ...prev, [mod.key]: true }));

              if (mod.key === 'bonusReroll') {
                setRerollsLeft(prev => prev + 1);
              }
            }}
            disabled={modifiers[mod.key]}
          >
            <Text style={styles.buttonText}>
              {modifiers[mod.key] ? `${mod.name} Ativado!` : `Usar: ${mod.name}`}
            </Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.button} onPress={resetGame}>
          <Text style={styles.buttonText}>🔄 Reiniciar Jogo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>🏠 Voltar ao Início</Text>
        </TouchableOpacity>
      </ScrollView>
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
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 10,
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
  },
  coins: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFD700',
    marginVertical: 10,
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 6,
  },
  cardList: {
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#8B0000',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#FFD700',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.9,
    shadowRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
});
