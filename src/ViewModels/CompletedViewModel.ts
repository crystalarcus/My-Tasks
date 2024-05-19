import { useContext, useState } from "react";
import { useTheme } from "react-native-paper";
import { AppContext } from "../AppContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";


export const CompletedViewModel = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const theme = useTheme();
    const { completed, moveToTodo } = useContext(AppContext);
    const [extra, setExtra] = useState(new Date().toString());
    const [snackVisible, setSnackVisible] = useState(false);

    const onRestorePress = (index: number) => {
        moveToTodo(index);
        setExtra(new Date().toString())
        setSnackVisible(true)
    }
    const onSnackDismiss = () => setSnackVisible(false);
    const RefreshList = () => setExtra(Date.now().toString())
    return {
        completed,
        moveToTodo,
        extra,
        setExtra,
        snackVisible,
        setSnackVisible,
        theme,
        RefreshList,
        onRestorePress,
        onSnackDismiss,
        navigation,
    }
}