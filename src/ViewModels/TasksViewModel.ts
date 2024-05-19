import { useContext, useState } from "react";
import { NativeScrollEvent } from "react-native";
import { useTheme } from "react-native-paper";
import { AppContext } from "../AppContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";


export const TasksViewModel = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const theme = useTheme();
    const { todo, moveToCompleted } = useContext(AppContext);
    const [extra, setExtra] = useState(new Date().toString());
    const [snackVisible, setSnackVisible] = useState(false);
    const [isExtended, setIsExtended] = useState(true);
    const fabStyle = { ['right']: 16 };
    const [fabVisible, setFabVisible] = useState(true);

    const onScroll = ({ nativeEvent }: { nativeEvent: NativeScrollEvent }) => {
        const currentScrollVelocity =
            Math.floor(nativeEvent?.velocity?.y ?? 0);
        nativeEvent.contentOffset.y > 20 ?
            setIsExtended(currentScrollVelocity < 0) : null;
    };
    const onCreatePress = () => { navigation.navigate('CreateTask') }
    const onCompletePress = (index: number) => {
        moveToCompleted(index);
        setExtra(new Date().toString())
        setSnackVisible(true)
    }
    const onSnackDismiss = () => setSnackVisible(false);
    return {
        todo,
        moveToCompleted,
        extra,
        fabStyle,
        theme,
        setExtra,
        snackVisible,
        setSnackVisible,
        isExtended,
        onScroll,
        onCreatePress,
        onCompletePress,
        onSnackDismiss,
        navigation,
        fabVisible,
        setFabVisible
    }
}