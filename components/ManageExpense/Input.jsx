import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { GlobalStyles } from "../../constants/styles";

const Input = ({ label, invalid, textInputConfig, style }) => {
  const inputStyles =
    textInputConfig && textInputConfig.multiline
      ? [styles.input, styles.inputMultiline, invalid && styles.invalidInput]
      : [styles.input, invalid && styles.invalidInput];

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  textInputConfig: PropTypes.object,
  invalid: PropTypes.bool,
  style: PropTypes.object,
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
    marginHorizontal: 4,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
});
