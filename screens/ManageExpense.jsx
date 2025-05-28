import React, { useContext, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";

import IconButton from "../components/UI/IconButton";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { ExpensesContext } from "../store/expenses-context";

import { GlobalStyles } from "../constants/styles";

const ManageExpense = () => {
  const expensesContext = useContext(ExpensesContext);
  const navigation = useNavigation();
  const route = useRoute();
  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;
  const expense = expensesContext.expenses.find(
    (expense) => expense.id === expenseId,
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  return (
    <View style={styles.container}>
      <ExpenseForm
        defaultValues={expense}
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onCancel={() => {
          navigation.goBack();
        }}
        onSubmit={(expenseData) => {
          if (isEditing) {
            expensesContext.updateExpense(expenseId, expenseData);
          } else {
            expensesContext.addExpense(expenseData);
          }
          navigation.goBack();
        }}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={() => {
              expensesContext.deleteExpense(expenseId);
              navigation.goBack();
            }}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
});
