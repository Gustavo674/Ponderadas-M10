// src/screens/ResetPasswordScreen.js

import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function ResetPasswordScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendOtp = () => {
    if (!isValidEmail(email)) {
      alert('Por favor, insira um email válido!');
      return;
    }

    // Gerar OTP no front (exemplo: 6 dígitos)
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otpCode);
    setOtpSent(true);

    // Mostrar OTP em um alert (para teste)
    alert(`Seu código OTP é: ${otpCode}`);
  };

  const handleResetPassword = () => {
    if (!isValidEmail(email)) {
      alert('Por favor, insira um email válido!');
      return;
    }

    if (otp.trim() === '') {
      alert('Por favor, insira o código OTP!');
      return;
    }

    if (otp === generatedOtp) {
      alert('Senha resetada com sucesso!');
      navigation.goBack();
    } else {
      alert('Código OTP incorreto.');
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Reset de Senha (OTP)</Title>

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Button
        mode="contained"
        onPress={handleSendOtp}
        style={styles.button}
      >
        Enviar código OTP
      </Button>

      {otpSent && (
        <>
          <TextInput
            label="Código OTP"
            value={otp}
            onChangeText={setOtp}
            mode="outlined"
            style={styles.input}
          />

          <Button
            mode="contained"
            onPress={handleResetPassword}
            style={styles.button}
          >
            Resetar Senha
          </Button>
        </>
      )}

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Voltar para Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f9f9f9',
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
