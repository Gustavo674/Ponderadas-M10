// src/screens/ShopScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet, FlatList, Alert } from 'react-native';

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

export default function ShopScreen({ navigation, route }) {
  const { coins, setCoins, ownedModifiers, setOwnedModifiers } = route.params;

  const buyModifier = (mod) => {
    if (coins >= 10) {
      setOwnedModifiers(prev => [...prev, mod]);
      setCoins(prev => prev - 10);

      Alert.alert("Comprou modificador!", `Você comprou: ${mod.name}`);
    } else {
      Alert.alert("Moedas insuficientes", "Você precisa de pelo menos 10 moedas para comprar um modificador.");
    }
  };

  const renderModifierItem = ({ item }) => (
    <View style={styles.modRow}>
      <Text style={styles.modName}>{item.name}</Text>
      <Button title="Comprar (10 moedas)" onPress={() => buyModifier(item)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Loja de Modificadores</Text>
      <Text style={styles.coins}>🪙 Moedas: {coins}</Text>

      <FlatList
        data={modifiersList}
        keyExtractor={item => item.id.toString()}
        renderItem={renderModifierItem}
        contentContainerStyle={styles.list}
      />

      <Text style={styles.subtitle}>Modificadores Comprados:</Text>
      {ownedModifiers.length === 0 && <Text>(Nenhum)</Text>}
      {ownedModifiers.map((mod, index) => (
        <Text key={index}>• {mod.name}</Text>
      ))}

      <Button title="Voltar ao Jogo" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  coins: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  modRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  modName: {
    fontSize: 16,
    flex: 1,
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 15,
    textAlign: 'center',
  },
});
