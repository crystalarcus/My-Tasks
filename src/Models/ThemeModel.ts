import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import { useState } from "react";
import { useColorScheme } from "react-native";
import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";

export const ThemeModel = () => {
    const [appTheme, setAppTheme] = useState('system');
    const { theme } = useMaterial3Theme();
    const systemTheme = useColorScheme();
    const paperTheme = appTheme == 'system' ?
        systemTheme == 'dark' ?
            { ...MD3DarkTheme, colors: theme.dark } :
            { ...MD3LightTheme, colors: theme.light } :
        appTheme == 'dark' ?
            { ...MD3DarkTheme, colors: theme.dark } :
            { ...MD3LightTheme, colors: theme.light }
    return paperTheme
}