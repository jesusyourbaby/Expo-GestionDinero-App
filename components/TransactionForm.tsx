import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Asegúrate de que este import esté correcto

// Definir el tipo de la transacción
type Transaction = {
  description: string;
  amount: number;
};

// Definir las props del componente TransactionForm
type TransactionFormProps = {
  addTransaction: (transaction: Transaction) => void;
};

export default function TransactionForm({ addTransaction }: TransactionFormProps) {
  const [transactionType, setTransactionType] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const categories = ['Alimento', 'Transporte', 'Entretenimiento', 'Salud', 'Medicina', 'Videojuego', 'ETC'];

  const handleSubmit = () => {
    const amountValue = parseFloat(amount);

    if (transactionType === 'Ingreso') {
      // Si es Ingreso, sumamos el monto
      addTransaction({ description, amount: amountValue });
    } else if (transactionType === 'Gasto') {
      // Si es Gasto, restamos el monto
      addTransaction({ description: category, amount: -amountValue });
    }

    // Limpiar los campos
    setDescription('');
    setAmount('');
    setCategory('');
  };

  return (
    <View style={styles.formContainer}>
      {/* Motivo */}
      <Text style={styles.label}>Motivo:</Text>
      <Picker
        selectedValue={transactionType}
        onValueChange={(itemValue) => setTransactionType(itemValue)}
        style={styles.picker}
      >
        {/* Solo mostrar "Seleccione Motivo" si no se ha seleccionado un tipo */}
        {!transactionType && <Picker.Item label="Seleccione Motivo" value="" />}
        <Picker.Item label="Ingreso" value="Ingreso" />
        <Picker.Item label="Gasto" value="Gasto" />
      </Picker>

      {/* Dependiendo del motivo, mostramos los campos correspondientes */}
      {transactionType === 'Ingreso' && (
        <>
          <Text style={styles.label}>Descripción:</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={setDescription}
            placeholder="Descripción del ingreso"
            placeholderTextColor="#888"
          />
        </>
      )}

      {transactionType === 'Gasto' && (
        <>
          <Text style={styles.label}>Categoría:</Text>
          <Picker
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
            style={styles.picker}
          >
            {categories.map((cat, index) => (
              <Picker.Item key={index} label={cat} value={cat} />
            ))}
          </Picker>
        </>
      )}

      {/* Mostrar campo Cantidad solo si hay un motivo seleccionado */}
      {transactionType && (
        <>
          <Text style={styles.label}>Cantidad:</Text>
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
            placeholder="Cantidad"
            keyboardType="numeric"
            placeholderTextColor="#888"
          />
        </>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Agregar Transacción</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
  },
  label: {
    fontSize: 18, // Aumentar tamaño de texto para mejor visibilidad
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  picker: {
    height: 60, // Aumentar la altura para mejorar visibilidad
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#FFFF',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc', // Cambiar a un borde gris
    fontSize: 18, // Aumentar el tamaño del texto en el Picker
    color: '#333', // Asegurarse de que el texto sea legible
  },
  input: {
    height: 50, // Aumentar la altura para evitar que el texto se corte
    borderColor: '#ccc', // Borde gris suave
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
    fontSize: 18, // Aumentar el tamaño del texto
    lineHeight: 22, // Mejorar la alineación de las letras
    backgroundColor: '#fff', // Fondo blanco para asegurar visibilidad
    color: '#333', // Color de texto oscuro para mayor contraste
  },
  button: {
    backgroundColor: '#6200EE',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
