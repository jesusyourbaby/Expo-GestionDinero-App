import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import IncomeExpenses from './components/IncomeExpenses';
import TransactionForm from './components/TransactionForm';

const screenWidth = Dimensions.get('window').width;

export default function App() {
  const [transactions, setTransactions] = useState([
    { id: '1', description: 'Ingreso 1', amount: 500, date: new Date() },
    { id: '2', description: 'Gasto 1', amount: -200, date: new Date() },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [showChartModal, setShowChartModal] = useState(false);

  const addTransaction = (transaction: { description: string, amount: number }) => {
    const date = new Date();
    setTransactions([
      ...transactions,
      { id: Math.random().toString(), ...transaction, date: date },
    ]);
  };

  const calculateTotal = () => {
    return transactions.reduce((acc, curr) => acc + curr.amount, 0);
  };

  const clearTransactions = () => {
    setTransactions([]);
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const income = transactions.filter(t => t.amount > 0).reduce((acc, curr) => acc + curr.amount, 0);
  const expense = transactions.filter(t => t.amount < 0).reduce((acc, curr) => acc + Math.abs(curr.amount), 0);

  const data = [
    { name: 'Ingreso', population: income, color: '#4CAF50', legendFontColor: '#000', legendFontSize: 15 },
    { name: 'Gastos', population: expense, color: '#F44336', legendFontColor: '#000', legendFontSize: 15 },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Administrador de Gastos</Text>
      </View>

      {/* Total de dinero */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Dinero Total:</Text>
        <Text
          style={[
            styles.totalAmount,
            calculateTotal() < 0 ? styles.negativeAmount : styles.positiveAmount,
          ]}
        >
          ${calculateTotal().toFixed(2)}
        </Text>
      </View>

      {/* Botón de Gráfico */}
      <View style={styles.showChartButtonContainer}>
        <TouchableOpacity onPress={() => setShowChartModal(true)} style={styles.button3D}>
          <Text style={styles.buttonText}>Mostrar Gráfico de Balance</Text>
        </TouchableOpacity>
      </View>

      {/* Modal de Gráfico */}
      <Modal visible={showChartModal} animationType="slide" transparent={true} onRequestClose={() => setShowChartModal(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Gráfico de Balance</Text>
            <PieChart data={data} width={screenWidth - 80} height={200} chartConfig={chartConfig} accessor="population" backgroundColor="transparent" paddingLeft="15" />
            <TouchableOpacity onPress={() => setShowChartModal(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Cerrar Gráfico</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Mostrar ingresos y gastos */}
      <IncomeExpenses transactions={transactions} />

      {/* Botón Historial */}
      <View style={styles.showChartButtonContainer}>
        <TouchableOpacity onPress={toggleModal} style={styles.button3D}>
          <Text style={styles.buttonText}>Mostrar Historial</Text>
        </TouchableOpacity>
      </View>

      {/* Modal Historial */}
      <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={toggleModal}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Historial de Transacciones</Text>
            <FlatList
              data={transactions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={[styles.transaction, item.amount > 0 ? styles.income : styles.expense]}>
                  <Text style={styles.transactionText}>
                    {item.description} - {item.amount > 0 ? 'Ingreso' : 'Gasto'}: ${Math.abs(item.amount).toFixed(2)} 
                    - {item.date.toLocaleString()}
                  </Text>
                </View>
              )}
            />
            <TouchableOpacity onPress={clearTransactions} style={styles.clearHistoryButton}>
              <Text style={styles.clearHistoryButtonText}>Limpiar Historial</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Formulario */}
      <TransactionForm addTransaction={addTransaction} />
    </ScrollView>
  );
}

const chartConfig = {
  backgroundColor: '#ffffff',
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: { borderRadius: 16 },
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FAFAFA",
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  header: {
    backgroundColor: "#6200EE",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 8,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  totalContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
  },
  negativeAmount: {
    color: 'red', // Si el total es negativo, color rojo
  },
  positiveAmount: {
    color: '#6200EE', // Si el total es positivo, color azul o cualquier otro
  },
  showChartButtonContainer: {
    marginVertical: 15,
  },
  button3D: {
    backgroundColor: '#6200EE',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '80%',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#6200EE',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  clearHistoryButton: {
    marginTop: 15,
    backgroundColor: '#FF5722',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  clearHistoryButtonText: {
    color: 'white',
    fontSize: 16,
  },
  transaction: {
    fontSize: 14,
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  transactionText: {
    fontSize: 14,
  },
  income: {
    backgroundColor: "#D4EDDA",
  },
  expense: {
    backgroundColor: "#F8D7DA",
  },
});
