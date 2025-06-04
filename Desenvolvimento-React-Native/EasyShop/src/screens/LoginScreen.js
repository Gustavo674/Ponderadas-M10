import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Simula login (em um projeto real faria requisição)
    if (email && password) {
      navigation.replace('MainTabs');
    } else {
      alert('Preencha e-mail e senha!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EasyShop - Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Entrar" onPress={handleLogin} />
      <Button
        title="Cadastre-se"
        onPress={() => navigation.navigate('Register')}
      />
      <Button
        title="Esqueci minha senha"
        onPress={() => navigation.navigate('ResetPassword')}
      />
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
