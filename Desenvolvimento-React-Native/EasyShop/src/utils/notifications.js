// utils/notifications.js

// Importa AsyncStorage para salvar notificações localmente
import AsyncStorage from '@react-native-async-storage/async-storage';

// Função utilitária para adicionar uma notificação
export const addNotification = async (message) => {
  try {
    // Recupera as notificações armazenadas
    const storedNotifications = await AsyncStorage.getItem('notifications');

    // Se houver notificações → converte de JSON para array, senão cria array vazio
    const notifications = storedNotifications ? JSON.parse(storedNotifications) : [];

    // Cria nova notificação (com mensagem e timestamp)
    const newNotification = {
      message,                  // Texto da notificação
      timestamp: Date.now(),    // Timestamp atual (em ms)
    };

    // Adiciona a nova notificação no início da lista (notificação mais recente no topo)
    notifications.unshift(newNotification);

    // Salva a lista atualizada de volta no AsyncStorage
    await AsyncStorage.setItem('notifications', JSON.stringify(notifications));

  } catch (error) {
    // Em caso de erro, exibe no console
    console.error('Erro ao adicionar notificação:', error);
  }
};
