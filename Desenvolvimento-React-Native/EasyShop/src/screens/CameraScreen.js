import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, StyleSheet, Image, Alert } from 'react-native';
import { TextInput, Button, Card, Title, Snackbar } from 'react-native-paper';
import { CameraView, useCameraPermissions } from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addNotification } from '../utils/notifications'; // IMPORTADO

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  const [photoUri, setPhotoUri] = useState(null);
  const [photoBase64, setPhotoBase64] = useState(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const [snackbarVisible, setSnackbarVisible] = useState(false);

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  const takePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ base64: true });
      setPhotoUri(photo.uri);
      setPhotoBase64(photo.base64);
    }
  };

  const handleAddProduct = async () => {
    if (!name || !description || !price || !photoBase64) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos e tire uma foto.');
      return;
    }

    const newProduct = {
      id: Date.now().toString(),
      name,
      description,
      price,
      image: photoBase64,
    };

    try {
      const storedProducts = await AsyncStorage.getItem('products');
      const products = storedProducts ? JSON.parse(storedProducts) : [];

      products.push(newProduct);

      await AsyncStorage.setItem('products', JSON.stringify(products));

      // 👉 Adiciona notificação de criação
      await addNotification(`Produto "${name}" foi adicionado!`);

      setSnackbarVisible(true);

      // Limpa o formulário:
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

  if (!permission || permission.status === 'undetermined') {
    return <View />;
  }

  if (permission.status === 'denied') {
    return <View style={styles.permissionContainer}><Title>Sem permissão para usar a câmera</Title></View>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
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

      <Card style={styles.card}>
        {photoUri ? (
          <Card.Cover source={{ uri: photoUri }} style={styles.photo} />
        ) : (
          <CameraView style={styles.camera} ref={cameraRef}>
            <View style={styles.buttonOverlay}>
              <Button mode="contained" onPress={takePhoto}>Tirar Foto</Button>
            </View>
          </CameraView>
        )}
      </Card>

      {photoUri && (
        <Button mode="outlined" onPress={() => { setPhotoUri(null); setPhotoBase64(null); }} style={styles.button}>
          Tirar outra foto
        </Button>
      )}

      <Button mode="contained" onPress={handleAddProduct} style={styles.button}>
        Adicionar Produto
      </Button>

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
