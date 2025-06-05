import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [photoUri, setPhotoUri] = useState(null);

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  const takePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhotoUri(photo.uri);
    }
  };

  if (!permission || permission.status === 'undetermined') {
    return <View />;
  }

  if (permission.status === 'denied') {
    return <Text>Sem permissão para usar a câmera</Text>;
  }

  return (
    <View style={styles.container}>
      {!photoUri ? (
        <CameraView style={styles.camera} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <Button title="Tirar Foto" onPress={takePhoto} />
          </View>
        </CameraView>
      ) : (
        <View style={styles.preview}>
          <Image source={{ uri: photoUri }} style={styles.photo} />
          <Button title="Tirar outra" onPress={() => setPhotoUri(null)} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1, justifyContent: 'flex-end' },
  buttonContainer: { backgroundColor: 'transparent', marginBottom: 20 },
  preview: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  photo: { width: 300, height: 400, marginBottom: 20 }
});
