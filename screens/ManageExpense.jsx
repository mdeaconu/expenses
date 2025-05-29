import React, { useContext, useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";

import IconButton from "../components/UI/IconButton";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { ExpensesContext } from "../store/expenses-context";

import { GlobalStyles } from "../constants/styles";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";
import { LoadingOverlay } from "../components/UI/LoadingOverlay";
import { ErrorOverlay } from "../components/UI/ErrorOverlay";

const ManageExpense = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();
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

  const submitHandler = async (expenseData) => {
    try {
      setIsSubmitting(true);
      if (isEditing) {
        expensesContext.updateExpense(expenseId, expenseData);
        await updateExpense(expenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expensesContext.addExpense({ ...expenseData, id: id });
      }
      navigation.goBack();
    } catch {
      setError("Could not save data - please try again later!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteHandler = async () => {
    try {
      setIsSubmitting(true);
      expensesContext.deleteExpense(expenseId);
      await deleteExpense(expenseId);
      navigation.goBack();
    } catch {
      setError("Could not delete expense - please try again later!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} />;
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        defaultValues={expense}
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onCancel={cancelHandler}
        onSubmit={submitHandler}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteHandler}
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
