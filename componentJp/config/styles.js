import { Platform } from 'react-native';

import Color from "../Color";

export default {
    Color,
    text:
    {
        fontSize: 18,
        color: Color.dark,
        fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir"
    }
}


