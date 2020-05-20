import * as React from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

class FormTextInput extends React.Component {
  render() {
    const { style, ...otherProps } = this.props;
    return (
      <TextInput
        selectionColor="#3498db"
        style={[styles.textInput, style]}
        {...otherProps}
      />
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: "grey",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 20,
  },
});

export default FormTextInput;
