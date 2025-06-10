import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
  ImageBackground,
} from 'react-native';

export default function TutorialScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ImageBackground
      source={require('../assets/poker_table_bg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <Animated.ScrollView contentContainerStyle={[styles.container, { opacity: fadeAnim }]}>
        <Text style={styles.title}>🃏 Como Jogar CardCrafter 🃏</Text>

        <Text style={styles.text}>
          🎴 Seu objetivo é montar combinações de cartas para alcançar a pontuação alvo de cada rodada.
        </Text>
        <Text style={styles.text}>🃏 Cada rodada você recebe 5 cartas aleatórias.</Text>
        <Text style={styles.text}>🏆 Tipos de pontuação:</Text>
        <Text style={styles.text}>
          - A = 10 pontos{"\n"}
          - K / Q / J = 5 pontos (ou 10 com modificador){"\n"}
          - Cartas numéricas = valor da carta{"\n"}
          - ♠️ Espadas dão +20 se o modificador de Espadas estiver ativo
        </Text>
        <Text style={styles.text}>🎮 Botões:</Text>
        <Text style={styles.text}>
          - "Jogar Rodada": Calcula sua pontuação e verifica se você passou{"\n"}
          - "Aplicar Modificador": Ativa um bônus especial para a rodada atual{"\n"}
          - "Nova Mão": Sorteia novas cartas
        </Text>
        <Text style={styles.text}>
          📈 A cada rodada, o alvo de pontuação aumenta!{"\n"}
          Tente chegar o mais longe que conseguir! 🚀
        </Text>

        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>🔙 Voltar</Text>
        </TouchableOpacity>
      </Animated.ScrollView>
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
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 12,
    lineHeight: 22,
    textAlign: 'left',
    width: '100%',
  },
  button: {
    backgroundColor: '#8B0000',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 15,
    marginTop: 30,
    borderWidth: 3,
    borderColor: '#FFD700',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.9,
    shadowRadius: 8,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
