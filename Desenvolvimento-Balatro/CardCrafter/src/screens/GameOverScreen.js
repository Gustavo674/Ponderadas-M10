// src/screens/GameOverScreen.js

// Importa o React e os componentes básicos do React Native
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

// Componente da Tela de Fim de Jogo (Game Over)
// Recebe "navigation" e "route" como props do React Navigation
export default function GameOverScreen({ navigation, route }) {

  // Desestrutura os parâmetros passados pela rota (vindos da GameScreen)
  const { round, coins } = route.params;

  // Função para reiniciar o jogo (navega para a tela 'Game')
  const handleRestart = () => {
    navigation.navigate('Game');
  };

  // Renderização da tela
  return (
    // Fundo da tela com imagem de mesa de poker
    <ImageBackground
      source={require('../assets/poker_table_bg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Título da tela */}
        <Text style={styles.title}>💀 Game Over 💀</Text>

        {/* Informações sobre o desempenho do jogador */}
        <Text style={styles.text}>Você chegou até a rodada {round}!</Text>
        <Text style={styles.text}>Moedas acumuladas: {coins} 🪙</Text>

        {/* Botão para reiniciar o jogo */}
        <TouchableOpacity style={styles.button} onPress={handleRestart}>
          <Text style={styles.buttonText}>🔄 Jogar Novamente</Text>
        </TouchableOpacity>

        {/* Botão para voltar para a tela inicial */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>🏠 Voltar ao Início</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

// Estilos da tela
const styles = StyleSheet.create({
  background: {
    flex: 1,               // Ocupa toda a tela
    width: '100%',         // Largura total
    height: '100%',        // Altura total
  },
  container: {
    flex: 1,               // Ocupa todo o espaço interno
    padding: 20,           // Espaçamento interno
    justifyContent: 'center',  // Centraliza verticalmente
    alignItems: 'center',      // Centraliza horizontalmente
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Fundo semi-transparente (efeito de escurecimento)
  },
  title: {
    fontSize: 36,              // Tamanho da fonte
    fontWeight: 'bold',        // Negrito
    color: '#FFD700',          // Dourado
    marginBottom: 20,          // Espaçamento abaixo
    textAlign: 'center',
    textShadowColor: '#000',   // Sombra do texto (preto)
    textShadowOffset: { width: 2, height: 2 },  // Direção da sombra
    textShadowRadius: 8,       // Suavização da sombra
  },
  text: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#8B0000',       // Vermelho escuro
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 15,                 // Cantos arredondados
    marginTop: 20,
    borderWidth: 3,
    borderColor: '#FFD700',           // Borda dourada
    shadowColor: '#FFD700',           // Sombra dourada
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
});
