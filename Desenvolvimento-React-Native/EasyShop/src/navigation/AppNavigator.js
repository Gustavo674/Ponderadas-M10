// Importa o React (necessário para usar componentes funcionais)
import React from 'react';

// Importa o Stack Navigator (navegação em pilha: Login → Cadastro → MainTabs → Detalhes)
import { createStackNavigator } from '@react-navigation/stack';

// Importa o Bottom Tab Navigator (navegação por abas inferiores: Home, Camera, Profile, Notifications)
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Importa todas as telas do app (screens)
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CameraScreen from '../screens/CameraScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NotificationsScreen from '../screens/NotificationsScreen';

// Cria uma instância do Stack Navigator
const Stack = createStackNavigator();

// Cria uma instância do Bottom Tab Navigator
const Tab = createBottomTabNavigator();

/**
 * Componente que define as abas principais do app (após login):
 * - Home
 * - Camera
 * - Profile
 * - Notifications
 */
function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Camera" component={CameraScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
    </Tab.Navigator>
  );
}

/**
 * Componente principal de navegação do app:
 * - Define o fluxo geral de telas
 * - Usa Stack Navigator (navegação em pilha)
 * 
 * Fluxo:
 * 1. Login
 * 2. Cadastro
 * 3. Reset de senha
 * 4. MainTabs (tela principal com abas)
 * 5. ProductDetail (detalhe de um produto, acessado por navegação a partir da Home)
 */
export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Tela inicial (Login) */}
      <Stack.Screen name="Login" component={LoginScreen} />

      {/* Tela de Cadastro */}
      <Stack.Screen name="Register" component={RegisterScreen} />

      {/* Tela de Reset de Senha */}
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />

      {/* Tela principal do app após login → navegação com abas */}
      <Stack.Screen name="MainTabs" component={MainTabs} />

      {/* Tela de Detalhes do Produto (pode ser acessada a partir da Home) */}
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
}
