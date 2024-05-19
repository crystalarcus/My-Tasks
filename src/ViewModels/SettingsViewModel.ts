import { useContext, useState } from "react";
import { AppContext } from "../AppContext";
import { useTheme } from "react-native-paper";

export const SettingsViewModel = () => {

    // State
    const { appTheme, changeTheme } = useContext(AppContext);
    const [isThemeDialogVisible, setIsThemeDialogOpen] = useState(false);
    const theme = useTheme();
    // Functions

    // App Theme
    const onThemeItemPress = () => {
        setIsThemeDialogOpen(true);
    }
    const onThemeChange = (value: string) => changeTheme(value);
    const onThemeDialogDismis = () => setIsThemeDialogOpen(false);

    return ({
        theme,
        appTheme,
        isThemeDialogVisible,
        onThemeItemPress,
        onThemeChange,
        onThemeDialogDismis,
    });
}