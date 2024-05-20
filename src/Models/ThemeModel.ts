import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { useColorScheme } from "react-native";
import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";
import switchTheme from "react-native-theme-switch-animation";

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

    // LOAD THEME from STORAGE
    const loadTheme = async () => {
        setAppTheme(await AsyncStorage.getItem('@appTheme') ?? 'system')
    }
    // Save THEME to STORAGE
    const changeTheme = async (value: string) => {
        switchTheme({
            switchThemeFunction: () => {
                setAppTheme(value)
            },
            animationConfig:{
                type:'fade',
                duration:450
            }
        })
        await AsyncStorage.setItem('@appTheme', value);
    }
    return { paperTheme, appTheme, loadTheme, changeTheme }
}