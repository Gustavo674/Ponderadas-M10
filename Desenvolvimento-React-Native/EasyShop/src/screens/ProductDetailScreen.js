// src/screens/ProductDetailScreen.js

import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Button, Snackbar, IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function ProductDetailScreen({ route }) {
  const navigation = useNavigation();
  const { product = { id: '0', name: 'Produto Padrão', price: '0', description: 'Sem descrição' } } = route.params || {};
  const [favorited, setFavorited] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const handleFavorite = async () => {
    try {
      await AsyncStorage.setItem(`fav-${product.id}`, JSON.stringify(product));
      setFavorited(true);
      setSnackbarVisible(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Botão de Voltar */}
      <View style={styles.backButtonContainer}>
        <IconButton
          icon="arrow-left"
          size={28}
          onPress={() => navigation.goBack()} // CORRIGIDO aqui!
        />
      </View>

      {/* Card com detalhes do produto */}
      <Card style={styles.card}>
        {/* Imagem placeholder */}
        <Card.Cover source={{ uri: product.image }} />

        <Card.Content>
          <Title style={styles.title}>{product.name}</Title>
          <Paragraph style={styles.price}>R$ {product.price}</Paragraph>
          <Paragraph style={styles.description}>{product.description}</Paragraph>
        </Card.Content>

        <Card.Actions style={styles.actions}>
          <Button
            mode="contained"
            icon={favorited ? 'heart' : 'heart-outline'}
            onPress={handleFavorite}
          >
            {favorited ? 'Favoritado' : 'Favoritar'}
          </Button>
        </Card.Actions>
      </Card>

      {/* Snackbar — feedback */}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={2000}
      >
        Produto favoritado!
      </Snackbar>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    flexGrow: 1,
    paddingTop: 50,
  },
  backButtonContainer: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  card: {
    elevation: 4,
    borderRadius: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    color: 'green',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 16,
  },
  actions: {
    justifyContent: 'center',
    paddingBottom: 16,
  },
});
