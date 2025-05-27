import React from "react";
import { FlatList } from "react-native";
import PropTypes from "prop-types";

import ExpenseItem from "./ExpenseItem";

const ExpensesList = ({ expenses }) => {
  return (
    <FlatList
      data={expenses}
      renderItem={(itemData) => <ExpenseItem {...itemData.item} />}
    />
  );
};

ExpensesList.propTypes = {
  expenses: PropTypes.array,
};

export default ExpensesList;
