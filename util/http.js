import axios from "axios";

const BACKEND_URL =
  "https://react-native-expenses-15b35-default-rtdb.firebaseio.com";
const apiClient = axios.create({ baseURL: BACKEND_URL });

/**
 * @param {Object} expenseData - The expense payload data
 * @param {string} expenseData.amount - The expense amount
 * @param {string} expenseData.date - The expense date
 * @param {string} expenseData.description - The expense description
 * @returns {Promise<string>} A promise that resolves when the store is complete.
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

/**
 * @param {string} id
 * @param {Object} expenseData - The expense payload data
 * @param {string} expenseData.amount - The expense amount
 * @param {string} expenseData.date - The expense date
 * @param {string} expenseData.description - The expense description
 * @returns {Promise<any>} A promise that resolves when the update is complete.
 */
export function updateExpense(id, expenseData) {
  return apiClient.put(`/expenses/${id}.json`, expenseData);
}

/**
 * @param {string} id
 * @returns {Promise<any>} A promise that resolves when the delete is complete.
 */
export function deleteExpense(id) {
  return apiClient.put(`/expenses/${id}.json`);
}
