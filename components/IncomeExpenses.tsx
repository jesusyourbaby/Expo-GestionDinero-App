import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const IncomeExpenses = ({ transactions }: any) => {
  const totalIncome = transactions.filter((trans: any) => trans.amount > 0)
                                  .reduce((acc: number, curr: any) => acc + curr.amount, 0);
  const totalExpense = transactions.filter((trans: any) => trans.amount < 0)
                                   .reduce((acc: number, curr: any) => acc + curr.amount, 0);

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.label}>Ingresos</Text>
        <Text style={styles.income}>${totalIncome.toFixed(2)}</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.label}>Gastos</Text>
        <Text style={styles.expense}>${Math.abs(totalExpense).toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
    padding: 10,
  },
  box: {
    flex: 1,
    alignItems: "center",
    padding: 15,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  income: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#4CAF50",
    marginTop: 5,
  },
  expense: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FF5252",
    marginTop: 5,
  },
});

export default IncomeExpenses;
