import React, { useReducer, useState } from "react";
import PropTypes from "prop-types";
import { createContext } from "react";

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ amount, date, description }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { amount, date, description }) => {},
});

const expensesReducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    }
    case "UPDATE": {
      const updatableExpensesIndex = state.findIndex(
        (expense) => expense.id === action.payload.id,
      );
      const updatableExpense = state[updatableExpensesIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpensesIndex] = updatedItem;
      return updatedExpenses;
    }
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
};

const ExpensesContextProvider = ({ children }) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  const value = {
    expenses: expensesState,
    addExpense: (expenseData) => {
      dispatch({ type: "ADD", payload: expenseData });
    },
    deleteExpense: (id) => {
      dispatch({ type: "DELETE", payload: id });
    },
    updateExpense: (id, expenseData) => {
      dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
    },
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

ExpensesContextProvider.propTypes = {
  children: PropTypes.object,
};

export default ExpensesContextProvider;

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2021-12-19"),
  },
  {
    id: "e2",
    description: "A pair of trousers",
    amount: 89.29,
    date: new Date("2022-01-05"),
  },
  {
    id: "e3",
    description: "Some bananas",
    amount: 5.99,
    date: new Date("2021-12-01"),
  },
  {
    id: "e4",
    description: "A book",
    amount: 14.99,
    date: new Date("2022-02-19"),
  },
  {
    id: "e5",
    description: "Another book",
    amount: 18.59,
    date: new Date("2022-02-18"),
  },
];
