// src/components/Card.js

// Importa o React e os componentes básicos do React Native
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Componente de carta
// Recebe como prop um objeto "card" com as propriedades "rank" e "suit"
export default function Card({ card }) {

  // Verifica se o naipe da carta é vermelho (copas ou ouros)
  const isRed = card.suit === '♥️' || card.suit === '♦️';

  // Retorna a estrutura visual da carta
  return (
    <View style={styles.card}>
      {/* Exibe o rank da carta, em vermelho se for naipe vermelho */}
      <Text style={[styles.rank, isRed && styles.redText]}>
        {card.rank}
      </Text>

      {/* Exibe o naipe da carta, em vermelho se for naipe vermelho */}
      <Text style={[styles.suit, isRed && styles.redText]}>
        {card.suit}
      </Text>
    </View>
  );
}

// Define os estilos visuais da carta
const styles = StyleSheet.create({
  card: {
    width: 80,             // Largura da carta
    height: 120,           // Altura da carta
    borderWidth: 2,        // Espessura da borda
    borderRadius: 10,      // Cantos arredondados
    borderColor: '#333',   // Cor da borda (cinza escuro)
    backgroundColor: '#fff', // Fundo branco da carta
    justifyContent: 'center', // Alinha conteúdo verticalmente
    alignItems: 'center',  // Alinha conteúdo horizontalmente
    marginHorizontal: 5,   // Espaçamento lateral entre cartas
    shadowColor: '#000',   // Cor da sombra
    shadowOpacity: 0.3,    // Opacidade da sombra
    shadowRadius: 5,       // Raio de espalhamento da sombra
    elevation: 5,          // Elevação (para Android, dá o efeito de sombra)
  },
  rank: {
    fontSize: 24,          // Tamanho da fonte para o rank
    fontWeight: 'bold',    // Negrito
  },
  suit: {
    fontSize: 20,          // Tamanho da fonte para o naipe
  },
  redText: {
    color: 'red',          // Cor vermelha (usada se for copas ou ouros)
  },
});
