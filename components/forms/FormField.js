import React from "react";
import { useFormikContext } from "formik";

import TextInputTheme from "../TextInput";
import ErrorMessage from "./ErrorMessage";

// This component interacts with the states of input fields in a form
function AppFormField({ name, width, value, ...otherProps }) {
  const {
    setFieldTouched,
    handleChange,
    errors,
    touched,
    values,
  } = useFormikContext();

  return (
    <>
      <TextInputTheme
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChange(name)}
        value={values[name] || value}
        width={width}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormField;
