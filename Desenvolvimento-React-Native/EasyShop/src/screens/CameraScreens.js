import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { Camera } from 'expo-camera';

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePhoto = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      setPhotoUri(photo.uri);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>Sem permissão para usar a câmera</Text>;
  }

  return (
    <View style={styles.container}>
      {!photoUri ? (
        <Camera style={styles.camera} ref={ref => setCameraRef(ref)}>
          <View style={styles.buttonContainer}>
            <Button title="Tirar Foto" onPress={takePhoto} />
          </View>
        </Camera>
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
