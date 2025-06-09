// src/components/Score.js

// Importa o React e os componentes básicos do React Native
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Componente de Pontuação (Score)
// Recebe uma prop "value" que representa a pontuação atual
export default function Score({ value }) {
  return (
    <View style={styles.container}>
      {/* Rótulo fixo */}
      <Text style={styles.label}>Pontuação:</Text>

      {/* Valor da pontuação vindo da prop */}
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

// Estilos do componente
const styles = StyleSheet.create({
  container: {
    marginVertical: 20,     // Espaço vertical acima e abaixo do score
    alignItems: 'center',   // Centraliza o conteúdo na horizontal
  },
  label: {
    fontSize: 18,           // Tamanho da fonte para o rótulo "Pontuação:"
    fontWeight: 'bold',     // Negrito
  },
  value: {
    fontSize: 24,           // Tamanho da fonte para o número da pontuação
    color: '#007aff',       // Cor azul
    fontWeight: 'bold',     // Negrito
  },
});
