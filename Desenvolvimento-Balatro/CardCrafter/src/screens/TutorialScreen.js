// src/screens/TutorialScreen.js
import React from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';

export default function TutorialScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Como Jogar CardCrafter</Text>

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

      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    marginBottom: 12,
    textAlign: 'left',
    width: '100%',
  },
});
