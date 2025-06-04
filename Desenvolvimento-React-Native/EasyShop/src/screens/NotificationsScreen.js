import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Simula notificações
    const simulated = [
      { id: '1', message: 'Novo produto adicionado!' },
      { id: '2', message: 'Promoção em destaque hoje!' },
      { id: '3', message: 'Seu pedido foi enviado.' }
    ];
    setNotifications(simulated);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.message}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notificações</Text>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
  item: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5
  }
});
