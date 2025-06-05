// src/screens/ResetPasswordScreen.js

import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function ResetPasswordScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  const handleResetPassword = () => {
    // Lógica de reset (mock ou real)
    if (email && otp) {
      alert('Senha resetada com sucesso!');
      navigation.goBack();
    } else {
      alert('Preencha e-mail e código OTP!');
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
