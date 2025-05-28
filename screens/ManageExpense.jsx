import React, { useContext, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";

import IconButton from "../components/UI/IconButton";
import Button from "../components/UI/Button";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { ExpensesContext } from "../store/expenses-context";

import { GlobalStyles } from "../constants/styles";
const ManageExpense = () => {
  const expensesContext = useContext(ExpensesContext);
  const navigation = useNavigation();
  const route = useRoute();
  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  return (
    <View style={styles.container}>
      <ExpenseForm />
      <View style={styles.buttons}>
        <Button
          style={styles.button}
          mode="flat"
          onPress={() => {
            navigation.goBack();
          }}
        >
          Cancel
        </Button>
        <Button
          style={styles.button}
          onPress={() => {
            if (isEditing) {
              expensesContext.updateExpense(expenseId, {
                amount: 39.99,
                description: "Test!!!",
                date: new Date("2025-05-27"),
              });
            } else {
              expensesContext.addExpense({
                amount: 19.99,
                description: "Test",
                date: new Date("2025-05-28"),
              });
            }
            navigation.goBack();
          }}
        >
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
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
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
