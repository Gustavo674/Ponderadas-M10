// src/screens/ProfileScreen.js

// Importa React e hooks
import React, { useState, useEffect } from 'react';

// Importa componentes básicos do React Native
import { View, ScrollView, StyleSheet, Image, Alert } from 'react-native';

// Importa componentes visuais do React Native Paper
import { TextInput, Button, Card, Title, Snackbar, Avatar } from 'react-native-paper';

// Importa AsyncStorage para armazenar / recuperar dados localmente
import AsyncStorage from '@react-native-async-storage/async-storage';

// Componente principal da tela de Perfil
export default function ProfileScreen() {

  // Estados para campos do perfil
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);  // foto (base64 ou uri)

  // Estados para lista de produtos criados e favoritos
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Estado para Snackbar
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  // useEffect → carrega dados do perfil, produtos e favoritos ao abrir a tela
  useEffect(() => {

    // Função para carregar dados do perfil
    const loadProfile = async () => {
      const storedName = await AsyncStorage.getItem('profile-name');
      const storedEmail = await AsyncStorage.getItem('profile-email');
      const storedPhone = await AsyncStorage.getItem('profile-phone');
      const storedPhoto = await AsyncStorage.getItem('profile-photo');

      if (storedName) setName(storedName);
      if (storedEmail) setEmail(storedEmail);
      if (storedPhone) setPhone(storedPhone);
      if (storedPhoto) setProfilePhoto(storedPhoto);
    };

    // Função para carregar produtos criados
    const loadProducts = async () => {
      const storedProducts = await AsyncStorage.getItem('products');
      const products = storedProducts ? JSON.parse(storedProducts) : [];
      setProducts(products);
    };

    // Função para carregar produtos favoritados
    const loadFavorites = async () => {
      const keys = await AsyncStorage.getAllKeys();
      const favKeys = keys.filter(key => key.startsWith('fav-'));  // filtra apenas chaves de favoritos
      const favItems = await AsyncStorage.multiGet(favKeys);
      const favorites = favItems.map(([key, value]) => JSON.parse(value));
      setFavorites(favorites);
    };

    // Chama as funções de carregamento
    loadProfile();
    loadProducts();
    loadFavorites();

  }, []);

  // Função para salvar o perfil
  const saveProfile = async () => {
    await AsyncStorage.setItem('profile-name', name);
    await AsyncStorage.setItem('profile-email', email);
    await AsyncStorage.setItem('profile-phone', phone);
    if (profilePhoto) {
      await AsyncStorage.setItem('profile-photo', profilePhoto);
    }
    setSnackbarVisible(true);
  };

  // Função para alterar a senha (simulada com Alert.prompt)
  const changePassword = async () => {
    Alert.prompt('Alterar Senha', 'Digite a nova senha:', async (newPassword) => {
      if (newPassword) {
        await AsyncStorage.setItem('profile-password', newPassword);
        Alert.alert('Senha alterada com sucesso!');
      }
    });
  };

  // JSX da tela
  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* Card de perfil */}
      <Card style={styles.card}>
        <Card.Title title="Meu Perfil" />
        <Card.Content>

          {/* Avatar */}
          <View style={styles.avatarContainer}>
            {profilePhoto ? (
              <Avatar.Image size={100} source={{ uri: profilePhoto }} />
            ) : (
              <Avatar.Icon size={100} icon="account" />
            )}
            <Button
              mode="outlined"
              onPress={() => {
                // Exemplo simples: usa imagem placeholder
                setProfilePhoto('https://placekitten.com/200/200');
              }}
              style={styles.avatarButton}
            >
              Alterar Foto
            </Button>
          </View>

          {/* Campos de perfil */}
          <TextInput
            label="Nome"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <TextInput
            label="Telefone"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            style={styles.input}
          />

          {/* Botões de ação */}
          <Button mode="contained" onPress={saveProfile} style={styles.button}>
            Salvar
          </Button>
          <Button mode="outlined" onPress={changePassword} style={styles.button}>
            Alterar Senha
          </Button>

        </Card.Content>
      </Card>

      {/* Card com produtos criados */}
      <Card style={styles.card}>
        <Card.Title title="Produtos Criados" />
        <Card.Content>
          {products.length === 0 ? (
            <Title>Nenhum produto criado.</Title>
          ) : (
            products.map((product) => (
              <Card key={product.id} style={styles.productCard}>
                {product.image && (
                  <Card.Cover source={{ uri: `data:image/jpeg;base64,${product.image}` }} style={styles.productImage} />
                )}
                <Card.Content>
                  <Title>{product.name}</Title>
                  <TextInput value={`Preço: R$ ${product.price}`} editable={false} style={styles.productText} />
                </Card.Content>
              </Card>
            ))
          )}
        </Card.Content>
      </Card>

      {/* Card com produtos favoritos */}
      <Card style={styles.card}>
        <Card.Title title="Favoritos" />
        <Card.Content>
          {favorites.length === 0 ? (
            <Title>Nenhum produto favoritado.</Title>
          ) : (
            favorites.map((fav) => (
              <Card key={fav.id} style={styles.productCard}>
                {fav.image && (
                  <Card.Cover source={{ uri: `data:image/jpeg;base64,${fav.image}` }} style={styles.productImage} />
                )}
                <Card.Content>
                  <Title>{fav.name}</Title>
                  <TextInput value={`Preço: R$ ${fav.price}`} editable={false} style={styles.productText} />
                </Card.Content>
              </Card>
            ))
          )}
        </Card.Content>
      </Card>

      {/* Snackbar de confirmação */}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
      >
        Perfil salvo com sucesso!
      </Snackbar>

    </ScrollView>
  );
}

// Estilos da tela
const styles = StyleSheet.create({
  container: { padding: 16 },

  card: { marginBottom: 16 },

  input: { marginBottom: 12 },

  button: { marginTop: 8 },

  avatarContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },

  avatarButton: {
    marginTop: 8,
  },

  productCard: {
    marginBottom: 12,
  },

  productImage: {
    height: 200,
  },

  productText: {
    marginTop: 8,
  },
});
