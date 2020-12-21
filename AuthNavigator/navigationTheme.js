import { DefaultTheme } from "@react-navigation/native";
import Color from "../componentJp/Color";

export default {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.Color,
    primary: Color.primary,
    background: Color.white,
  },
};
