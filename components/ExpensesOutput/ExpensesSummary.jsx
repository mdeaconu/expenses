import PropTypes from "prop-types";
import React from "react";
import { Text, View } from "react-native";

const ExpensesSummary = ({ expenses, periodName }) => {
  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);

  return (
    <View>
      <Text>{periodName}</Text>
      <Text>${expensesSum.toFixed(2)}</Text>
    </View>
  );
};

ExpensesSummary.propTypes = {
  expenses: PropTypes.array,
  periodName: PropTypes.string,
};

export default ExpensesSummary;
