// utils/notifications.js

import AsyncStorage from '@react-native-async-storage/async-storage';

export const addNotification = async (message) => {
  try {
    const storedNotifications = await AsyncStorage.getItem('notifications');
    const notifications = storedNotifications ? JSON.parse(storedNotifications) : [];

    const newNotification = {
      message,
      timestamp: Date.now(),
    };

    // Coloca a notificação mais recente no topo
    notifications.unshift(newNotification);

    await AsyncStorage.setItem('notifications', JSON.stringify(notifications));
  } catch (error) {
    console.error('Erro ao adicionar notificação:', error);
  }
};
