// src/screens/LoginScreen.js

// Importa React e hook useState
import React, { useState } from 'react';

// Importa componentes básicos do React Native
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

// Importa componentes visuais do React Native Paper
import { TextInput, Button, Title } from 'react-native-paper';

// Importa hook de navegação
import { useNavigation } from '@react-navigation/native';

// Componente principal da tela de Login
export default function LoginScreen() {

  // Hook para navegar entre telas
  const navigation = useNavigation();

  // Estados para armazenar os campos do formulário
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // Função para validar se o email tem formato válido
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Função para realizar o "login"
  const handleLogin = () => {

    // Validação básica de email
    if (!isValidEmail(email)) {
      alert('Por favor, insira um email válido!');
      return;
    }

    // Navega para a tela principal
    navigation.navigate('MainTabs');
  };

  // JSX da tela
  return (
    <View style={styles.container}>

      {/* Título da tela */}
      <Title style={styles.title}>EasyShop - Login</Title>

      {/* Campo de email */}
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Campo de senha */}
      <TextInput
        label="Senha"
        value={senha}
        onChangeText={setSenha}
        mode="outlined"
        style={styles.input}
        secureTextEntry
      />

      {/* Botão de login */}
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Entrar
      </Button>

      {/* Link para tela de Cadastro */}
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Cadastre-se</Text>
      </TouchableOpacity>

      {/* Link para tela de Reset de Senha */}
      <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
        <Text style={styles.link}>Esqueci minha senha</Text>
      </TouchableOpacity>

    </View>
  );
}

// Estilos da tela
const styles = StyleSheet.create({
  container: {
    flex: 1,                                // Ocupa toda a tela
    justifyContent: 'center',               // Centraliza verticalmente
    paddingHorizontal: 20,                  // Margem horizontal
    backgroundColor: '#f9f9f9',             // Cor de fundo
  },

  title: {
    textAlign: 'center',
    marginBottom: 24,
    fontSize: 24,
    fontWeight: 'bold',
  },

  input: {
    marginBottom: 16,
  },

  button: {
    marginTop: 8,
    marginBottom: 16,
  },

  link: {
    textAlign: 'center',
    color: '#6200ee',                       // Roxo padrão do Paper
    marginTop: 8,
    fontSize: 16,
  },
});
