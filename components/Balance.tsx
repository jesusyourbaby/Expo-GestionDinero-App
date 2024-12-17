import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface BalanceProps {
  balance: number;
}

const Balance = ({ balance }: BalanceProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Balance Actual</Text>
      <Text style={styles.amount}>${balance.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#4CAF50",  // Color de fondo atractivo
    borderRadius: 15,            // Bordes redondeados
    alignItems: "center",
    marginVertical: 15,
    shadowColor: "#000",        // Sombra
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,               // Sombra en Android
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",              // Texto blanco para contraste
  },
  amount: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",              // Texto blanco
    marginTop: 10,
  },
});

export default Balance;
