// src/screens/HomeScreen.js

import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Button, Card, IconButton } from 'react-native-paper';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const LIMIT = 10;

  const fetchProducts = async (pageNumber = 1, refreshing = false) => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axios.get(`http://10.128.0.215:3000/products?_page=${pageNumber}&_limit=${LIMIT}`);
      const newProducts = response.data;

      setProducts(prevProducts =>
        refreshing ? newProducts : [...prevProducts, ...newProducts]
      );

      setHasMore(newProducts.length === LIMIT);
      setPage(pageNumber + 1);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    } finally {
      setLoading(false);
      if (refreshing) setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      fetchProducts(page);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
    fetchProducts(1, true);
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card} onPress={() => navigation.navigate('ProductDetail', { product: item })}>
      <Card.Title title={item.name} />
      <Card.Content>
        <Text style={styles.price}>R$ {item.price}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      {/* Mensagem de boas-vindas */}
      <Text style={styles.welcome}>Bem-vindo ao EasyShop!</Text>

      {/* Card de Menu Rápido */}
      <Card style={styles.menuCard}>
        <Card.Title title="Menu Rápido" />
        <Card.Content style={styles.menuButtons}>
          <Button
            mode="contained"
            icon="account"
            style={styles.menuButton}
            onPress={() => navigation.navigate('Profile')}
          >
            Perfil
          </Button>

          <Button
            mode="contained"
            icon="camera"
            style={styles.menuButton}
            onPress={() => navigation.navigate('Camera')}
          >
            Câmera
          </Button>

          <Button
            mode="contained"
            icon="bell"
            style={styles.menuButton}
            onPress={() => navigation.navigate('Notifications')}
          >
            Notificações
          </Button>
        </Card.Content>
      </Card>

      {/* Placeholder de filtros */}
      <Text style={styles.filterTitle}>Filtros (em breve)</Text>

      {/* Lista de produtos */}
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        ListFooterComponent={loading && <ActivityIndicator size="large" color="#6200ee" />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9', padding: 10 },
  welcome: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center', color: '#333' },
  menuCard: {
    marginBottom: 15,
    borderRadius: 8,
    elevation: 3,
  },
  menuButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    marginBottom: 10,
  },
  menuButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#555'
  },
  list: { paddingBottom: 20 },
  card: {
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
  },
  price: { fontSize: 16, color: 'green', marginTop: 8 },
});
