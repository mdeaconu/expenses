import axios from "axios";

const BACKEND_URL =
  "https://react-native-expenses-15b35-default-rtdb.firebaseio.com";
const apiClient = axios.create({ baseURL: BACKEND_URL });

/**
 * @param {Object} expenseData
 */
export async function storeExpense(expenseData) {
  const response = await apiClient.post("/expenses.json", expenseData);
  const id = response.data.name;
  return id;
}

export async function fetchExpenses() {
  const response = await apiClient.get("/expenses.json");

  return Object.entries(response.data).map(([key, value]) => ({
    id: key,
    amount: value.amount,
    date: new Date(value.date),
    description: value.description,
  }));
}
