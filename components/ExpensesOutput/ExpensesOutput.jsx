import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";

import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";

const ExpensesOutput = ({ expenses, expensesPeriod, fallbackText }) => {
  const content = expenses.length ? (
    <ExpensesList expenses={expenses} />
  ) : (
    <Text style={styles.infoText}>{fallbackText}</Text>
  );

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      {content}
    </View>
  );
};

ExpensesOutput.propTypes = {
  expenses: PropTypes.array,
  expensesPeriod: PropTypes.string,
  fallbackText: PropTypes.string,
};

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
