import PropTypes from "prop-types";
import React from "react";
import { Text, TextInput, View } from "react-native";

const Input = ({ label, textInputConfig }) => {
  return (
    <View>
      <Text>{label}</Text>
      <TextInput {...textInputConfig} />
    </View>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  textInputConfig: PropTypes.object,
};

export default Input;
