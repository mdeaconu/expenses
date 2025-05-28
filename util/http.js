import axios from "axios";

/**
 * @param {Object} expenseData
 */
export function storeExpense(expenseData) {
  axios.post(
    "https://react-native-expenses-15b35-default-rtdb.firebaseio.com/expenses.json",
    expenseData,
  );
}
