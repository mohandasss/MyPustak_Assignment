import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';

const BACKEND_URL = 'http://192.168.0.101:8000';

// Define types for book and order result
interface Book {
  id: number;
  title: string;
  author: string;
}
interface OrderResult {
  message?: string;
  error?: string;
  [key: string]: any;
}

export default function BooksListScreen() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [customerName, setCustomerName] = useState('');
  const [orderResult, setOrderResult] = useState<OrderResult | null>(null);
  const [orderLoading, setOrderLoading] = useState(false);

  useEffect(() => {
    // Fetch the list of books from the backend
    const fetchBooks = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/books`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data: Book[] = await res.json();
        setBooks(data);
      } catch (error: any) {
        setBooks([]);
        // Show a user-friendly error message if fetch fails
        setOrderResult({ error: 'Failed to fetch books. Please check your network or backend.' });
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const openOrderForm = (book: Book) => {
    setSelectedBook(book);
    setCustomerName('');
    setOrderResult(null);
    setModalVisible(true);
  };

  const placeOrder = async () => {
    setOrderLoading(true);
    setOrderResult(null);
    try {
      // Place an order by sending book_id and customer_name to the backend
      const res = await fetch(`${BACKEND_URL}/order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ book_id: selectedBook?.id, customer_name: customerName })
      });
      if (!res.ok) {
        // Try to parse error message from backend
        let data: OrderResult;
        try {
          data = await res.json();
        } catch {
          data = { error: `HTTP error! status: ${res.status}` };
        }
        throw new Error(data.error || `HTTP error! status: ${res.status}`);
      }
      const data: OrderResult = await res.json();
      setOrderResult(data.message ? data : { error: data.error });
    } catch (e: any) {
      setOrderResult({ error: e.message || 'Network error' });
    }
    setOrderLoading(false);
  };

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" /><Text>Loading books...</Text></View>;

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
        ListEmptyComponent={<Text style={{ color: 'red', marginTop: 20 }}>No books found or failed to load.</Text>}
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
