// src/screens/RegisterScreen.js

// Importa React e hook useState
import React, { useState } from 'react';

// Importa componentes básicos do React Native
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

// Importa componentes visuais do React Native Paper
import { TextInput, Button, Title } from 'react-native-paper';

// Importa hook de navegação
import { useNavigation } from '@react-navigation/native';

// Componente principal da tela de Cadastro
export default function RegisterScreen() {

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

  // Função para registrar o usuário
  const handleRegister = () => {

    // Validação básica de email
    if (!isValidEmail(email)) {
      alert('Por favor, insira um email válido!');
      return;
    }

    // Validação de campos preenchidos
    if (email && senha) {
      alert('Usuário cadastrado com sucesso!');
      // Após cadastro, volta para tela de Login
      navigation.goBack();
    } else {
      alert('Preencha e-mail e senha!');
    }
  };

  // JSX da tela
  return (
    <View style={styles.container}>

      {/* Título da tela */}
      <Title style={styles.title}>Cadastro</Title>

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

      {/* Botão para registrar */}
      <Button mode="contained" onPress={handleRegister} style={styles.button}>
        Registrar
      </Button>

      {/* Link para voltar para a tela de Login */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Voltar para Login</Text>
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
