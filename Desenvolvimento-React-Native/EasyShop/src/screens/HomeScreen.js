// src/screens/HomeScreen.js

// Importa React e hooks
import React, { useState, useEffect } from 'react';

// Importa componentes básicos do React Native
import { View, FlatList, ActivityIndicator, StyleSheet, Text } from 'react-native';

// Importa axios para requisições HTTP
import axios from 'axios';

// Importa navegação
import { useNavigation } from '@react-navigation/native';

// Importa componentes visuais do React Native Paper
import { Button, Card } from 'react-native-paper';

// Componente principal da tela Home
export default function HomeScreen() {

  // Hook para navegar entre telas
  const navigation = useNavigation();

  // Estados
  const [products, setProducts] = useState([]);            // Lista de produtos
  const [page, setPage] = useState(1);                     // Página atual (para paginação)
  const [loading, setLoading] = useState(false);           // Estado de carregamento
  const [refreshing, setRefreshing] = useState(false);     // Estado de "pull-to-refresh"
  const [hasMore, setHasMore] = useState(true);            // Se ainda existem produtos para carregar

  // Limite de produtos por página
  const LIMIT = 10;

  // Função para buscar produtos da API (json-server)
  const fetchProducts = async (pageNumber = 1, refreshing = false) => {

    // Evita chamadas duplicadas
    if (loading) return;

    setLoading(true);

    try {
      // Faz requisição GET com paginação
      const response = await axios.get(`http://10.128.0.215:3000/products?_page=${pageNumber}&_limit=${LIMIT}`);
      const newProducts = response.data;

      // Se for um refresh, substitui a lista; se não, adiciona no final
      setProducts(prevProducts =>
        refreshing ? newProducts : [...prevProducts, ...newProducts]
      );

      // Verifica se ainda tem mais produtos para carregar
      setHasMore(newProducts.length === LIMIT);

      // Atualiza página
      setPage(pageNumber + 1);

    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    } finally {
      setLoading(false);
      if (refreshing) setRefreshing(false);
    }
  };

  // useEffect → busca inicial dos produtos quando a tela carrega
  useEffect(() => {
    fetchProducts();
  }, []);

  // Handler para carregar mais produtos (scroll infinito)
  const handleLoadMore = () => {
    if (hasMore && !loading) {
      fetchProducts(page);
    }
  };

  // Handler para "pull-to-refresh" (refresh da lista)
  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
    fetchProducts(1, true);
  };

  // Função que renderiza cada item da FlatList (um produto)
  const renderItem = ({ item }) => (
    <Card
      style={styles.card}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <Card.Title title={item.name} />
      <Card.Content>
        <Text style={styles.price}>R$ {item.price}</Text>
      </Card.Content>
    </Card>
  );

  // JSX principal da tela
  return (
    <View style={styles.container}>

      {/* Mensagem de boas-vindas */}
      <Text style={styles.welcome}>Bem-vindo ao EasyShop!</Text>

      {/* Card de Menu Rápido com botões de atalho */}
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

      {/* Placeholder de Filtros */}
      <Text style={styles.filterTitle}>Filtros (em breve)</Text>

      {/* Lista de produtos */}
      <FlatList
        data={products}                                // Dados da lista
        keyExtractor={item => item.id.toString()}       // Chave única de cada item
        renderItem={renderItem}                        // Função para renderizar cada item
        contentContainerStyle={styles.list}            // Estilo do conteúdo
        onEndReached={handleLoadMore}                  // Evento de scroll para carregar mais
        onEndReachedThreshold={0.5}                    // Threshold de 50%
        refreshing={refreshing}                        // Estado de "pull-to-refresh"
        onRefresh={handleRefresh}                      // Função de refresh
        ListFooterComponent={loading && (              // Indicador de carregamento no final da lista
          <ActivityIndicator size="large" color="#6200ee" />
        )}
      />

    </View>
  );
}

// Estilos da tela
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9', padding: 10 },

  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },

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
    color: '#555',
  },

  list: {
    paddingBottom: 20,
  },

  card: {
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
  },

  price: {
    fontSize: 16,
    color: 'green',
    marginTop: 8,
  },
});
