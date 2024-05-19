import { useContext, useState } from "react";
import { NativeScrollEvent } from "react-native";
import { useTheme } from "react-native-paper";
import { AppContext } from "../AppContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";


export const StarredViewModel = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const theme = useTheme();
    const { todo, moveToCompleted, moveToTodo } = useContext(AppContext);
    const [starredList, setStarredList] = useState<Array<Task>>([]);
    const [extra, setExtra] = useState(new Date().toString());
    const [snackVisible, setSnackVisible] = useState(false);
    const [isExtended, setIsExtended] = useState(true);
    const [fabVisible, setFabVisible] = useState(true);
    const fabStyle = { ['right']: 16 };
    const LoadStarredList = () => {
        setStarredList(todo.filter(item => item.isStarred));
    }
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
        LoadStarredList();
    }
    const onSnackDismiss = () => setSnackVisible(false);
   
    return {
        todo,
        starredList,
        moveToCompleted,
        extra,
        fabStyle,
        theme,
        setExtra,
        snackVisible,
        setSnackVisible,
        isExtended,
        LoadStarredList,
        onScroll,
        onCreatePress,
        onCompletePress,
        onSnackDismiss,
        navigation,
        fabVisible,
        setFabVisible
    }
}