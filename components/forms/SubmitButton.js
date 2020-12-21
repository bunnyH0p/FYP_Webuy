import React from "react";
import { useFormikContext } from "formik";

import ButtonTheme from "../Button";

function SubmitButton({ title, ...otherProps}) {
  const { handleSubmit } = useFormikContext();

  return <ButtonTheme 
            title={title}
            onPress={handleSubmit}
            {...otherProps}
          />;
}

export default SubmitButton;
