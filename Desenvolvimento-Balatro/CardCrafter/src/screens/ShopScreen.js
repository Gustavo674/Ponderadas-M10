// src/screens/ShopScreen.js

// Importa React e componentes básicos
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, ImageBackground } from 'react-native';

// Lista de modificadores disponíveis para compra
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

// Componente da Loja (ShopScreen)
export default function ShopScreen({ navigation, route }) {
  // Recebe os parâmetros enviados pela GameScreen
  const { coins, setCoins, ownedModifiers, setOwnedModifiers } = route.params;

  // Função para comprar um modificador
  const buyModifier = (mod) => {
    if (coins >= 10) {
      // Adiciona o modificador à lista de comprados
      setOwnedModifiers(prev => [...prev, mod]);
      // Deduz o custo em moedas
      setCoins(prev => prev - 10);

      // Alerta de sucesso
      Alert.alert("Comprou modificador!", `Você comprou: ${mod.name}`);
    } else {
      // Alerta de moedas insuficientes
      Alert.alert("Moedas insuficientes", "Você precisa de pelo menos 10 moedas para comprar um modificador.");
    }
  };

  // Renderiza um item (linha) da lista de modificadores
  const renderModifierItem = ({ item }) => (
    <View style={styles.modRow}>
      <Text style={styles.modName}>{item.name}</Text>
      <TouchableOpacity style={styles.buyButton} onPress={() => buyModifier(item)}>
        <Text style={styles.buyButtonText}>Comprar (10 🪙)</Text>
      </TouchableOpacity>
    </View>
  );

  // Renderização da tela
  return (
    // Fundo com imagem da mesa de poker
    <ImageBackground
      source={require('../assets/poker_table_bg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Título da loja */}
        <Text style={styles.title}>🛒 Loja de Modificadores</Text>
        {/* Quantidade de moedas disponíveis */}
        <Text style={styles.coins}>🪙 Moedas: {coins}</Text>

        {/* Lista de modificadores para compra */}
        <FlatList
          data={modifiersList}
          keyExtractor={item => item.id.toString()}
          renderItem={renderModifierItem}
          contentContainerStyle={styles.list}
        />

        {/* Lista de modificadores já comprados */}
        <Text style={styles.subtitle}>✨ Modificadores Comprados:</Text>
        {ownedModifiers.length === 0 && <Text style={styles.text}>(Nenhum)</Text>}
        {ownedModifiers.map((mod, index) => (
          <Text key={index} style={styles.text}>• {mod.name}</Text>
        ))}

        {/* Botão para voltar para a GameScreen */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>🏠 Voltar ao Jogo</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
