import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Card, Title, List, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    const storedNotifications = await AsyncStorage.getItem('notifications');
    const notifs = storedNotifications ? JSON.parse(storedNotifications) : [];
    setNotifications(notifs);
  };

  const clearNotifications = async () => {
    await AsyncStorage.removeItem('notifications');
    setNotifications([]);
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{item.message}</Title>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Notificações</Title>
      {notifications.length === 0 ? (
        <Title style={styles.empty}>Nenhuma notificação.</Title>
      ) : (
        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
      <Button mode="outlined" onPress={clearNotifications} style={styles.button}>
        Limpar Notificações
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 16 },
  empty: { textAlign: 'center', marginTop: 50 },
  card: { marginBottom: 12 },
  button: { marginTop: 16 },
});
