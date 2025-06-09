// src/screens/ProductDetailScreen.js

// Importa React e hooks
import React, { useState } from 'react';

// Importa componentes básicos do React Native
import { View, StyleSheet, ScrollView } from 'react-native';

// Importa componentes visuais do React Native Paper
import { Card, Title, Paragraph, Button, Snackbar, IconButton } from 'react-native-paper';

// Importa AsyncStorage para salvar favoritos
import AsyncStorage from '@react-native-async-storage/async-storage';

// Importa navegação
import { useNavigation } from '@react-navigation/native';

// Importa função utilitária para adicionar notificações
import { addNotification } from '../utils/notifications';

// Componente principal da tela de Detalhes do Produto
export default function ProductDetailScreen({ route }) {

  // Hook de navegação
  const navigation = useNavigation();

  // Recupera o produto vindo da tela anterior (via route.params)
  const { product = { id: '0', name: 'Produto Padrão', price: '0', description: 'Sem descrição', image: '' } } = route.params || {};

  // Estado para controlar se o produto foi favoritado
  const [favorited, setFavorited] = useState(false);

  // Estado para controlar visibilidade da Snackbar
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  // Função para favoritar o produto
  const handleFavorite = async () => {
    try {
      // Salva o produto como favorito no AsyncStorage (chave 'fav-id')
      await AsyncStorage.setItem(`fav-${product.id}`, JSON.stringify(product));

      // Adiciona notificação de que o produto foi favoritado
      await addNotification(`Produto "${product.name}" foi favoritado!`);

      // Atualiza estado para exibir ícone de "favoritado"
      setFavorited(true);

      // Exibe Snackbar de sucesso
      setSnackbarVisible(true);

    } catch (error) {
      console.error(error);
    }
  };

  // JSX da tela
  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* Botão de Voltar */}
      <View style={styles.backButtonContainer}>
        <IconButton
          icon="arrow-left"
          size={28}
          onPress={() => navigation.goBack()}
        />
      </View>

      {/* Card com detalhes do produto */}
      <Card style={styles.card}>

        {/* Imagem do produto (se não houver imagem, mostra um placeholder) */}
        <Card.Cover
          source={{
            uri: product.image
              ? `data:image/jpeg;base64,${product.image}`
              : 'https://via.placeholder.com/300x300.png?text=Sem+Imagem'
          }}
        />

        <Card.Content>
          {/* Nome do produto */}
          <Title style={styles.title}>{product.name}</Title>

          {/* Preço do produto */}
          <Paragraph style={styles.price}>R$ {product.price}</Paragraph>

          {/* Descrição do produto */}
          <Paragraph style={styles.description}>{product.description}</Paragraph>
        </Card.Content>

        {/* Botão de "Favoritar" */}
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

      {/* Snackbar — feedback de sucesso */}
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

// Estilos da tela
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
