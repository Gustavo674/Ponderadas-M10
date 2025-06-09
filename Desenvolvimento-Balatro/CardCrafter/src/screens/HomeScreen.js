// src/screens/HomeScreen.js

// Importa React e hooks necessários
import React, { useEffect, useRef } from 'react';
// Importa componentes básicos do React Native
import { View, Text, TouchableOpacity, StyleSheet, Animated, ImageBackground } from 'react-native';

// Componente da Tela Inicial (HomeScreen)
export default function HomeScreen({ navigation }) {

  // Hook de animação (valor animado de opacidade, começa em 0 - invisível)
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Quando a tela monta, inicia animação de fade-in (opacidade de 0 → 1 em 1 segundo)
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000, // duração em ms (1 segundo)
      useNativeDriver: true, // otimiza a performance da animação
    }).start();
  }, []);

  // Renderização da tela
  return (
    // Fundo com imagem de mesa de poker
    <ImageBackground
      source={require('../assets/poker_table_bg.png')} 
      style={styles.background}
      resizeMode="cover"
    >
      {/* Container com fade animado */}
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        {/* Título do jogo */}
        <Text style={styles.title}> CardCrafter </Text>

        {/* Botão para iniciar jogo */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Game')}>
          <Text style={styles.buttonText}>🎮 Começar Jogo</Text>
        </TouchableOpacity>

        {/* Botão para tutorial */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Tutorial')}>
          <Text style={styles.buttonText}>📜 Tutorial</Text>
        </TouchableOpacity>
      </Animated.View>
    </ImageBackground>
  );
}

// Estilos visuais
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // leve overlay preto para destacar conteúdo
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFD700', // dourado
    marginBottom: 50,
    textShadowColor: '#000', // sombra preta no texto
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
  },
  button: {
    backgroundColor: '#8B0000', // vermelho escuro
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 15,
    marginBottom: 25,
    borderWidth: 3,
    borderColor: '#FFD700', // borda dourada
    shadowColor: '#FFD700', // sombra dourada
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.9,
    shadowRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
