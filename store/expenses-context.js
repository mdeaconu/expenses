import React, { useReducer } from "react";
import PropTypes from "prop-types";
import { createContext } from "react";

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ amount, date, description }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { amount, date, description }) => {},
  setExpenses: (expenses) => {},
});

const expensesReducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      return [action.payload, ...state];
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
    case "SET":
      return action.payload.reverse();
    default:
      return state;
  }
};

const ExpensesContextProvider = ({ children }) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

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
    setExpenses: (expenses) => {
      dispatch({ type: "SET", payload: expenses });
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
