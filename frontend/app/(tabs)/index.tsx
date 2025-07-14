import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';

const BACKEND_URL = 'http://192.168.0.101:8000';

export default function BooksListScreen() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [customerName, setCustomerName] = useState('');
  const [orderResult, setOrderResult] = useState(null);
  const [orderLoading, setOrderLoading] = useState(false);

  useEffect(() => {
    fetch(`${BACKEND_URL}/books`)
      .then(res => res.json())
      .then(data => {
        setBooks(data);
        setLoading(false);
      });
  }, []);

  const openOrderForm = (book) => {
    setSelectedBook(book);
    setCustomerName('');
    setOrderResult(null);
    setModalVisible(true);
  };

  const placeOrder = async () => {
    setOrderLoading(true);
    setOrderResult(null);
    try {
      const res = await fetch(`${BACKEND_URL}/order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ book_id: selectedBook.id, customer_name: customerName })
      });
      const data = await res.json();
      setOrderResult(data.message ? data : { error: data.error });
    } catch (e) {
      setOrderResult({ error: 'Network error' });
    }
    setOrderLoading(false);
  };

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;

  return (
    <View style={styles.center}>
      <Text style={styles.title}>Book List</Text>
      <FlatList
        data={books}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.bookItem} onPress={() => openOrderForm(item)}>
            <Text style={styles.bookTitle}>{item.title}</Text>
            <Text style={styles.bookAuthor}>{item.author}</Text>
          </TouchableOpacity>
        )}
        style={{ width: '100%' }}
        contentContainerStyle={{ alignItems: 'center' }}
      />
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalBg}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Order: {selectedBook?.title}</Text>
            <TextInput
              placeholder="Enter your name"
              value={customerName}
              onChangeText={setCustomerName}
              style={styles.input}
            />
            <Button title="Place Order" onPress={placeOrder} disabled={!customerName || orderLoading} />
            {orderLoading && <ActivityIndicator style={{ marginTop: 10 }} />}
            {orderResult && (
              <Text style={{ color: orderResult.error ? 'red' : 'green', marginTop: 10 }}>
                {orderResult.error || orderResult.message}
              </Text>
            )}
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  bookItem: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    width: 300,
    alignItems: 'center',
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  bookAuthor: {
    fontSize: 14,
    color: '#555',
  },
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    width: 320,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    width: 250,
    marginBottom: 16,
  },
});
