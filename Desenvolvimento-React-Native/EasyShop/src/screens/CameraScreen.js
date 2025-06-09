// src/screens/CameraScreen.js

// Importa React e hooks
import React, { useState, useEffect, useRef } from 'react';

// Importa componentes básicos do React Native
import { View, ScrollView, StyleSheet, Alert } from 'react-native';

// Importa componentes visuais do React Native Paper
import { TextInput, Button, Card, Title, Snackbar } from 'react-native-paper';

// Importa componente de câmera e permissões da câmera
import { CameraView, useCameraPermissions } from 'expo-camera';

// Importa AsyncStorage para armazenamento local
import AsyncStorage from '@react-native-async-storage/async-storage';

// Importa função utilitária para adicionar notificações
import { addNotification } from '../utils/notifications';

// Componente principal da tela de Câmera / Adicionar Produto
export default function CameraScreen() {

  // Hook para controlar permissão de uso da câmera
  const [permission, requestPermission] = useCameraPermissions();

  // Referência para acessar os métodos da câmera
  const cameraRef = useRef(null);

  // Estados para armazenar a foto tirada
  const [photoUri, setPhotoUri] = useState(null);           // URI da foto (para exibir preview)
  const [photoBase64, setPhotoBase64] = useState(null);     // Foto em base64 (para salvar no produto)

  // Estados para os campos do formulário de produto
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  // Estado para controlar visibilidade da Snackbar de sucesso
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  // useEffect → pede permissão para usar a câmera quando o componente é carregado
  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  // Função para tirar uma foto com a câmera
  const takePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ base64: true });
      setPhotoUri(photo.uri);           // Salva URI da imagem para preview
      setPhotoBase64(photo.base64);     // Salva imagem em base64 para persistência
    }
  };

  // Função para adicionar um novo produto
  const handleAddProduct = async () => {

    // Validação: verifica se todos os campos foram preenchidos
    if (!name || !description || !price || !photoBase64) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos e tire uma foto.');
      return;
    }

    // Cria um novo objeto de produto
    const newProduct = {
      id: Date.now().toString(),  // ID gerado com timestamp
      name,
      description,
      price,
      image: photoBase64,
    };

    try {
      // Recupera lista de produtos já armazenados
      const storedProducts = await AsyncStorage.getItem('products');
      const products = storedProducts ? JSON.parse(storedProducts) : [];

      // Adiciona o novo produto à lista
      products.push(newProduct);

      // Salva a lista atualizada no AsyncStorage
      await AsyncStorage.setItem('products', JSON.stringify(products));

      // Adiciona notificação de que um novo produto foi criado
      await addNotification(`Produto "${name}" foi adicionado!`);

      // Exibe Snackbar de sucesso
      setSnackbarVisible(true);

      // Limpa os campos do formulário
      setName('');
      setDescription('');
      setPrice('');
      setPhotoUri(null);
      setPhotoBase64(null);

    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Falha ao salvar o produto.');
    }
  };

  // Renderização condicional caso não tenha permissão
  if (!permission || permission.status === 'undetermined') {
    return <View />;
  }

  // Renderização caso a permissão tenha sido negada
  if (permission.status === 'denied') {
    return <View style={styles.permissionContainer}><Title>Sem permissão para usar a câmera</Title></View>;
  }

  // JSX da tela
  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* Card com formulário de cadastro do produto */}
      <Card style={styles.card}>
        <Card.Title title="Adicionar Produto" />
        <Card.Content>
          <TextInput
            label="Nome do Produto"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            label="Descrição"
            value={description}
            onChangeText={setDescription}
            style={styles.input}
          />
          <TextInput
            label="Preço"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            style={styles.input}
          />
        </Card.Content>
      </Card>

      {/* Card com câmera ou preview da foto */}
      <Card style={styles.card}>
        {photoUri ? (
          // Se já foi tirada uma foto → exibe a imagem
          <Card.Cover source={{ uri: photoUri }} style={styles.photo} />
        ) : (
          // Se ainda não foi tirada → exibe a câmera
          <CameraView style={styles.camera} ref={cameraRef}>
            <View style={styles.buttonOverlay}>
              <Button mode="contained" onPress={takePhoto}>Tirar Foto</Button>
            </View>
          </CameraView>
        )}
      </Card>

      {/* Botão para "tirar outra foto" */}
      {photoUri && (
        <Button mode="outlined" onPress={() => { setPhotoUri(null); setPhotoBase64(null); }} style={styles.button}>
          Tirar outra foto
        </Button>
      )}

      {/* Botão para adicionar o produto */}
      <Button mode="contained" onPress={handleAddProduct} style={styles.button}>
        Adicionar Produto
      </Button>

      {/* Snackbar de feedback (produto adicionado com sucesso) */}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
      >
        Produto adicionado com sucesso!
      </Snackbar>

    </ScrollView>
  );
}

// Estilos da tela
const styles = StyleSheet.create({
  container: { padding: 16 },
  card: { marginBottom: 16 },
  input: { marginBottom: 12 },
  camera: { height: 400, borderRadius: 8, overflow: 'hidden', justifyContent: 'flex-end' },
  photo: { height: 400 },
  buttonOverlay: { flex: 1, justifyContent: 'flex-end', alignItems: 'center', padding: 16, backgroundColor: 'rgba(0,0,0,0.2)' },
  button: { marginTop: 16 },
  permissionContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
});
