// App.js

// Importa React
import React from 'react';

// Importa o container de navegação (prover contexto de navegação para o app)
import { NavigationContainer } from '@react-navigation/native';

// Cria um stack navigator (navegação em "pilha", típica para apps com várias telas)
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importa as telas do jogo
import HomeScreen from './src/screens/HomeScreen';
import GameScreen from './src/screens/GameScreen';
import ShopScreen from './src/screens/ShopScreen';
import TutorialScreen from './src/screens/TutorialScreen';
import GameOverScreen from './src/screens/GameOverScreen';

// Cria a instância do Stack Navigator
const Stack = createNativeStackNavigator();

// Componente principal do app
export default function App() {
  return (
    // NavigationContainer é obrigatório — ele fornece o contexto de navegação
    <NavigationContainer>

      {/* Define as telas da navegação em pilha */}
      <Stack.Navigator initialRouteName="Home">
        {/* Tela inicial (menu) */}
        <Stack.Screen name="Home" component={HomeScreen} />

        {/* Tela do jogo principal */}
        <Stack.Screen name="Game" component={GameScreen} />

        {/* Tela da loja */}
        <Stack.Screen name="Shop" component={ShopScreen} />

        {/* Tela de tutorial */}
        <Stack.Screen name="Tutorial" component={TutorialScreen} />

        {/* Tela de Game Over */}
        <Stack.Screen name="GameOver" component={GameOverScreen} />
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}
