// src/screens/ResetPasswordScreen.js

// Importa React e hook useState
import React, { useState } from 'react';

// Importa componentes básicos do React Native
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

// Importa componentes visuais do React Native Paper
import { TextInput, Button, Title } from 'react-native-paper';

// Importa hook de navegação
import { useNavigation } from '@react-navigation/native';

// Componente principal da tela de Reset de Senha (com OTP)
export default function ResetPasswordScreen() {

  // Hook para navegação
  const navigation = useNavigation();

  // Estados
  const [email, setEmail] = useState('');             // Campo de email
  const [otp, setOtp] = useState('');                 // Campo de código OTP digitado pelo usuário
  const [otpSent, setOtpSent] = useState(false);      // Se o OTP já foi enviado
  const [generatedOtp, setGeneratedOtp] = useState(''); // Código OTP gerado no frontend

  // Função para validar email
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Função para gerar e "enviar" o OTP (simulado no front)
  const handleSendOtp = () => {
    // Validação de email
    if (!isValidEmail(email)) {
      alert('Por favor, insira um email válido!');
      return;
    }

    // Gera um código OTP de 6 dígitos
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Salva o OTP gerado no estado
    setGeneratedOtp(otpCode);
    setOtpSent(true);

    // Simula envio — mostra em um alert (para teste)
    alert(`Seu código OTP é: ${otpCode}`);
  };

  // Função para resetar a senha
  const handleResetPassword = () => {

    // Validação de email
    if (!isValidEmail(email)) {
      alert('Por favor, insira um email válido!');
      return;
    }

    // Validação de campo OTP preenchido
    if (otp.trim() === '') {
      alert('Por favor, insira o código OTP!');
      return;
    }

    // Verificação do código OTP
    if (otp === generatedOtp) {
      // Se OTP correto
      alert('Senha resetada com sucesso!');
      navigation.goBack();
    } else {
      // Se OTP incorreto
      alert('Código OTP incorreto.');
    }
  };

  // JSX da tela
  return (
    <View style={styles.container}>

      {/* Título */}
      <Title style={styles.title}>Reset de Senha (OTP)</Title>

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

      {/* Botão para enviar OTP */}
      <Button
        mode="contained"
        onPress={handleSendOtp}
        style={styles.button}
      >
        Enviar código OTP
      </Button>

      {/* Se o OTP foi enviado → mostra campo para digitar OTP + botão de reset */}
      {otpSent && (
        <>
          {/* Campo para digitar código OTP */}
          <TextInput
            label="Código OTP"
            value={otp}
            onChangeText={setOtp}
            mode="outlined"
            style={styles.input}
          />

          {/* Botão para resetar senha */}
          <Button
            mode="contained"
            onPress={handleResetPassword}
            style={styles.button}
          >
            Resetar Senha
          </Button>
        </>
      )}

      {/* Link para voltar para tela de Login */}
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
    color: '#6200ee',
    marginTop: 8,
    fontSize: 16,
  },
});
