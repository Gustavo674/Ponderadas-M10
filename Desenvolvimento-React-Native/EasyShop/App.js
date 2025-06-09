// App.js

// Importa React
import React from 'react';

// Importa NavigationContainer → componente que envolve toda a navegação do app
import { NavigationContainer } from '@react-navigation/native';

// Importa o componente AppNavigator que define as rotas do app (Stack + Tabs)
import AppNavigator from './src/navigation/AppNavigator';

// Componente principal da aplicação
export default function App() {
  return (
    // NavigationContainer deve envolver TODA a estrutura de navegação
    <NavigationContainer>
      {/* Aqui chamamos o AppNavigator que define todas as telas e fluxos de navegação */}
      <AppNavigator />
    </NavigationContainer>
  );
}
