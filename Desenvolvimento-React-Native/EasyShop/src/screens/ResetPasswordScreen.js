import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  const handleReset = () => {
    if (email && otp) {
      alert('Senha redefinida com sucesso!');
      navigation.navigate('Login');
    } else {
      alert('Preencha email e OTP!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset de Senha (OTP)</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="OTP"
        value={otp}
        onChangeText={setOtp}
        style={styles.input}
      />
      <Button title="Resetar Senha" onPress={handleReset} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5
  }
});
