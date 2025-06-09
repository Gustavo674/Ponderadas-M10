// src/screens/TutorialScreen.js

// Importa React e hooks
import React, { useEffect, useRef } from 'react';
// Importa componentes básicos
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Animated, ImageBackground } from 'react-native';

// Componente da tela de Tutorial
export default function TutorialScreen({ navigation }) {
  
  // Animação de fade-in (opacidade)
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Efeito de animação quando a tela carrega
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800, // duração da animação
      useNativeDriver: true,
    }).start();
  }, []);

  // Renderização da tela
  return (
    // Fundo com imagem da mesa de poker
    <ImageBackground
      source={require('../assets/poker_table_bg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Conteúdo com fade-in */}
      <Animated.ScrollView contentContainerStyle={[styles.container, { opacity: fadeAnim }]}>
        {/* Título */}
        <Text style={styles.title}>🃏 Como Jogar CardCrafter 🃏</Text>

        {/* Instruções do jogo */}
        <Text style={styles.text}>
          🎴 Seu objetivo é montar combinações de cartas para alcançar a pontuação alvo de cada rodada.
        </Text>
        <Text style={styles.text}>
          🃏 Cada rodada você recebe 5 cartas aleatórias.
        </Text>
        <Text style={styles.text}>
          🏆 Tipos de pontuação:
        </Text>
        <Text style={styles.text}>
          - A = 10 pontos{"\n"}
          - K / Q / J = 5 pontos (ou 10 com modificador){"\n"}
          - Cartas numéricas = valor da carta{"\n"}
          - ♠️ Espadas dão +20 se o modificador de Espadas estiver ativo
        </Text>
        <Text style={styles.text}>
          🎮 Botões:
        </Text>
        <Text style={styles.text}>
          - "Jogar Rodada": Calcula sua pontuação e verifica se você passou{"\n"}
          - "Aplicar Modificador": Ativa um bônus especial para a rodada atual{"\n"}
          - "Nova Mão": Sorteia novas cartas
        </Text>
        <Text style={styles.text}>
          📈 A cada rodada, o alvo de pontuação aumenta!{"\n"}
          Tente chegar o mais longe que conseguir! 🚀
        </Text>

        {/* Botão para voltar */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>🔙 Voltar</Text>
        </TouchableOpacity>
      </Animated.ScrollView>
    </ImageBackground>
  );
}
