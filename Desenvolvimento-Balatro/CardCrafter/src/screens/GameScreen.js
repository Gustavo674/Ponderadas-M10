// src/screens/GameScreen.js

// Importa React e hooks necessários
import React, { useEffect, useState } from 'react';
// Importa componentes básicos do React Native
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert, ImageBackground, ScrollView } from 'react-native';
// Importa o componente de carta visual
import Card from '../components/Card';
// Importa o componente de pontuação
import Score from '../components/Score';
// Importa função para buscar cartas da "API"
import { getCards } from '../services/api';

// Lista de possíveis modificadores que o jogo pode aplicar
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

// Componente principal da tela de jogo
export default function GameScreen({ navigation }) {

  // Estado da mão atual de cartas
  const [cards, setCards] = useState([]);
  
  // Estado da pontuação atual
  const [score, setScore] = useState(0);
  
  // Estado dos modificadores ativos
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

  // Modificador aleatório atual da rodada
  const [currentModifier, setCurrentModifier] = useState(null);

  // Pontuação alvo para passar de rodada
  const [targetScore, setTargetScore] = useState(50);

  // Número da rodada atual
  const [currentRound, setCurrentRound] = useState(1);

  // Quantidade de rerolls restantes
  const BASE_REROLLS = 3;
  const [rerollsLeft, setRerollsLeft] = useState(BASE_REROLLS);

  // Moedas acumuladas
  const [coins, setCoins] = useState(0);

  // Lista de modificadores comprados na loja
  const [ownedModifiers, setOwnedModifiers] = useState([]);

  // Função para buscar nova mão de cartas e resetar modificadores
  const fetchNewHand = async () => {
    const fetchedCards = await getCards();
    setCards(fetchedCards);
    setScore(0);

    // Reseta modificadores da rodada
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

    // Sorteia um modificador aleatório para a rodada
    const randomMod = modifiersList[Math.floor(Math.random() * modifiersList.length)];
    setCurrentModifier(randomMod);

    // Configura rerolls da rodada
    setRerollsLeft(BASE_REROLLS + (modifiers.bonusReroll ? 1 : 0));
  };

  // Executa fetchNewHand uma vez no início
  useEffect(() => {
    fetchNewHand();
  }, []);

  // Função para rerollar a mão
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

  // Função que calcula a pontuação da mão atual
  const calculateScore = () => {
    let total = 0;

    cards.forEach(card => {
      let cardValue = 0;

      // Valor do A
      if (card.rank === 'A') {
        cardValue = modifiers.bonusAce20 ? 20 : 10;
      }
      // Valor de J/Q/K
      else if (card.rank === 'K' || card.rank === 'Q' || card.rank === 'J') {
        cardValue = modifiers.faceCardsBoost ? 10 : 5;
      }
      // Valor de 2-5
      else if (['2', '3', '4', '5'].includes(card.rank)) {
        cardValue = modifiers.bonusLowCards ? 10 : parseInt(card.rank);
      }
      // Valor numérico normal
      else {
        cardValue = parseInt(card.rank);
      }

      total += cardValue;

      // Bônus por ♠️
      if (modifiers.bonusSpades && card.suit === '♠️') {
        total += 20;
      }

      // Bônus por cartas vermelhas
      if (modifiers.bonusRedCards && (card.suit === '♥️' || card.suit === '♦️')) {
        total += 5;
      }
    });

    // Bônus fixo +10
    if (modifiers.bonusFlat10) {
      total += 10;
    }

    // Multiplicador +50%
    if (modifiers.bonusMultiplier) {
      total = Math.floor(total * 1.5);
    }

    setScore(total);
    return total;
  };

  // Verifica se o jogador passou ou perdeu a rodada
  const checkRoundProgression = (calculatedScore) => {
    if (calculatedScore >= targetScore) {
      // Passou de rodada
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
      // Game Over
      navigation.navigate('GameOver', {
        round: currentRound,
        coins: coins,
      });
    }
  };

  // Função chamada ao clicar em "Jogar Rodada"
  const playRound = () => {
    const calculatedScore = calculateScore();
    checkRoundProgression(calculatedScore);
  };

  // Ativa o modificador da rodada
  const applyModifier = () => {
    if (currentModifier) {
      setModifiers(prev => ({ ...prev, [currentModifier.key]: true }));

      // Se for bonusReroll, aumenta rerolls
      if (currentModifier.key === 'bonusReroll') {
        setRerollsLeft(prev => prev + 1);
      }
    }
  };

  // Abre a tela da loja
  const openShop = () => {
    navigation.navigate('Shop', {
      coins,
      setCoins,
      ownedModifiers,
      setOwnedModifiers,
    });
  };

  // Reseta o jogo inteiro
  const resetGame = () => {
    setCurrentRound(1);
    setTargetScore(50);
    setCoins(0);
    setOwnedModifiers([]);
    fetchNewHand();
  };

  // Renderização da tela
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

        {/* Botão para jogar rodada */}
        <TouchableOpacity style={styles.button} onPress={playRound}>
          <Text style={styles.buttonText}>🎮 Jogar Rodada</Text>
        </TouchableOpacity>

        {/* Botão para aplicar modificador */}
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

        {/* Botão para reroll */}
        <TouchableOpacity style={styles.button} onPress={rerollHand}>
          <Text style={styles.buttonText}>🔄 Nova Mão ({rerollsLeft} rerolls)</Text>
        </TouchableOpacity>

        {/* Botão para abrir loja */}
        <TouchableOpacity style={styles.button} onPress={openShop}>
          <Text style={styles.buttonText}>🛒 Abrir Loja</Text>
        </TouchableOpacity>

        {/* Lista de modificadores comprados */}
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

        {/* Botão para reiniciar jogo */}
        <TouchableOpacity style={styles.button} onPress={resetGame}>
          <Text style={styles.buttonText}>🔄 Reiniciar Jogo</Text>
        </TouchableOpacity>

        {/* Botão para voltar ao menu */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>🏠 Voltar ao Início</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}
