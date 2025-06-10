import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  ImageBackground,
} from 'react-native';

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
      <TouchableOpacity style={styles.buyButton} onPress={() => buyModifier(item)}>
        <Text style={styles.buyButtonText}>Comprar (10 🪙)</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ImageBackground
      source={require('../assets/poker_table_bg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>🛒 Loja de Modificadores</Text>
        <Text style={styles.coins}>🪙 Moedas: {coins}</Text>

        <FlatList
          data={modifiersList}
          keyExtractor={item => item.id.toString()}
          renderItem={renderModifierItem}
          contentContainerStyle={styles.list}
        />

        <Text style={styles.subtitle}>✨ Modificadores Comprados:</Text>
        {ownedModifiers.length === 0 && <Text style={styles.text}>(Nenhum)</Text>}
        {ownedModifiers.map((mod, index) => (
          <Text key={index} style={styles.text}>• {mod.name}</Text>
        ))}

        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>🏠 Voltar ao Jogo</Text>
        </TouchableOpacity>
      </View>
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
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 10,
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
    textAlign: 'center',
  },
  coins: {
    fontSize: 18,
    color: '#FFD700',
    marginBottom: 20,
  },
  list: {
    width: '100%',
    paddingBottom: 20,
  },
  modRow: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: '#FFD700',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modName: {
    color: '#fff',
    fontSize: 16,
    flexShrink: 1,
  },
  buyButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderColor: '#FFD700',
    borderWidth: 2,
  },
  buyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    color: '#fff',
    fontSize: 16,
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
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
