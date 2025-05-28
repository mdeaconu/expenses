import React from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";

import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";

const ExpensesOutput = ({ expenses, expensesPeriod }) => {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      <ExpensesList expenses={expenses} />
    </View>
  );
};

ExpensesOutput.propTypes = {
  expenses: PropTypes.array,
  expensesPeriod: PropTypes.string,
};

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
