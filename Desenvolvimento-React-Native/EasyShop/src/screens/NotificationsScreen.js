// src/screens/NotificationsScreen.js

// Importa React e hooks
import React, { useState, useEffect } from 'react';

// Importa componentes básicos do React Native
import { View, FlatList, StyleSheet } from 'react-native';

// Importa componentes visuais do React Native Paper
import { Card, Title, Button } from 'react-native-paper';

// Importa AsyncStorage para armazenar / recuperar notificações localmente
import AsyncStorage from '@react-native-async-storage/async-storage';

// Componente principal da tela de Notificações
export default function NotificationsScreen() {

  // Estado para armazenar a lista de notificações
  const [notifications, setNotifications] = useState([]);

  // useEffect → carrega as notificações ao abrir a tela
  useEffect(() => {
    loadNotifications();
  }, []);

  // Função para carregar as notificações do AsyncStorage
  const loadNotifications = async () => {
    const storedNotifications = await AsyncStorage.getItem('notifications');
    const notifs = storedNotifications ? JSON.parse(storedNotifications) : [];
    setNotifications(notifs);
  };

  // Função para limpar todas as notificações
  const clearNotifications = async () => {
    await AsyncStorage.removeItem('notifications');    // Remove a chave 'notifications'
    setNotifications([]);                              // Atualiza o estado (esvazia a lista)
  };

  // Função para renderizar cada item da FlatList (uma notificação)
  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{item.message}</Title>
      </Card.Content>
    </Card>
  );

  // JSX da tela
  return (
    <View style={styles.container}>

      {/* Título da tela */}
      <Title style={styles.title}>Notificações</Title>

      {/* Se não houver notificações */}
      {notifications.length === 0 ? (
        <Title style={styles.empty}>Nenhuma notificação.</Title>
      ) : (
        // Se houver notificações, exibe FlatList
        <FlatList
          data={notifications}                         // Dados da lista
          renderItem={renderItem}                      // Função para renderizar cada item
          keyExtractor={(item, index) => index.toString()} // Chave única (posição no array)
        />
      )}

      {/* Botão para limpar notificações */}
      <Button mode="outlined" onPress={clearNotifications} style={styles.button}>
        Limpar Notificações
      </Button>

    </View>
  );
}

// Estilos da tela
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 16,
  },

  empty: {
    textAlign: 'center',
    marginTop: 50,
  },

  card: {
    marginBottom: 12,
  },

  button: {
    marginTop: 16,
  },
});
