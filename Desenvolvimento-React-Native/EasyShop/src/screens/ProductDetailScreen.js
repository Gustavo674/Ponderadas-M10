import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProductDetailScreen({ route }) {
  const { product = { id: '0', name: 'Produto Padrão', price: '0', description: 'Sem descrição' } } = route.params || {};
  const [favorited, setFavorited] = useState(false);

  const handleFavorite = async () => {
    try {
      await AsyncStorage.setItem(`fav-${product.id}`, JSON.stringify(product));
      setFavorited(true);
      alert('Produto favoritado!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>R$ {product.price}</Text>
      <Text style={styles.desc}>{product.description}</Text>
      <Button
        title={favorited ? 'Favoritado' : 'Favoritar'}
        onPress={handleFavorite}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  price: { fontSize: 20, color: 'green', marginBottom: 10 },
  desc: { fontSize: 16, marginBottom: 20 }
});
