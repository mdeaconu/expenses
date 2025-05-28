import React from "react";
import { View } from "react-native";

import Input from "./Input";

const ExpenseForm = () => {
  return (
    <View>
      <Input
        label="Amount"
        textInputConfig={{
          keyboardType: "decimal",
          onChangeText: () => {},
        }}
      />
      <Input
        label="Date"
        textInputConfig={{
          placeholder: "YYYY-MM-DD",
          maxLength: 10,
          onChangeText: () => {},
        }}
      />
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
        }}
      />
    </View>
  );
};

export default ExpenseForm;
