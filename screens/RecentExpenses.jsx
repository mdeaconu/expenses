import React, { useContext, useEffect, useState } from "react";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import { LoadingOverlay } from "../components/UI/LoadingOverlay";

const RecentExpenses = () => {
  const expensesContext = useContext(ExpensesContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getExpenses = async () => {
      setLoading(true);
      const expenses = await fetchExpenses();
      setLoading(false);
      expensesContext.setExpenses(expenses);
    };

    getExpenses();
  }, []);

  if (loading) {
    return <LoadingOverlay />;
  }

  const recent = expensesContext.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput
      expenses={recent}
      expensesPeriod="Last 7 Days"
      fallbackText="No expenses registered for the last 7 days."
    />
  );
};

export default RecentExpenses;
