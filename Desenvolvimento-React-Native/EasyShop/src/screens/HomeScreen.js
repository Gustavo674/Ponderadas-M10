// src/screens/HomeScreen.js

import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const LIMIT = 20;

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
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>R$ {item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
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
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  list: { padding: 10 },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
  },
  name: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  price: { fontSize: 16, color: 'green' },
});
