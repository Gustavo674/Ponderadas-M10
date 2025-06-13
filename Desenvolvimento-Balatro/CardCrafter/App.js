// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import GameScreen from './src/screens/GameScreen';
import ShopScreen from './src/screens/ShopScreen';
import TutorialScreen from './src/screens/TutorialScreen';
import GameOverScreen from './src/screens/GameOverScreen';
import HistoryScreen from './src/screens/HistoryScreen'; // nova tela adicionada

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Início' }} />
        <Stack.Screen name="Game" component={GameScreen} options={{ title: 'Jogo' }} />
        <Stack.Screen name="Shop" component={ShopScreen} options={{ title: 'Loja' }} />
        <Stack.Screen name="Tutorial" component={TutorialScreen} options={{ title: 'Tutorial' }} />
        <Stack.Screen name="GameOver" component={GameOverScreen} options={{ title: 'Game Over' }} />
        <Stack.Screen name="History" component={HistoryScreen} options={{ title: 'Histórico' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
