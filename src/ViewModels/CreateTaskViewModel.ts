import { useNavigation } from "@react-navigation/native"
import { useContext, useState } from "react";
import { AppContext } from "../AppContext";
import { useTheme } from "react-native-paper";

export const CreateTaskViewModel = (task: Task | undefined, index?: number) => {
    // States
    const navigation = useNavigation();
    const { createTask, insertTodo } = useContext(AppContext);
    const [title, setTitle] = useState(task ? task?.title : "");
    const [isStarred, setIsStarred] = useState(task ? task?.isStarred : false);
    const theme = useTheme();
    // Functions
    const onTitleChange = (value: string) => setTitle(value);
    const onbackButtonPress = () => navigation.goBack();
    const onStarPress = () => setIsStarred(!isStarred);
    const onCreateButtonPress = () => {
        const task: Task = {
            id: Date.now().toString(),
            title: title,
            isStarred: isStarred,
            isComplete: false,
        }
        task && index ? insertTodo(task, index) :
            createTask(task);
        navigation.goBack();
    }
    return {
        theme,
        title,
        isStarred,
        onTitleChange,
        onStarPress,
        onbackButtonPress,
        onCreateButtonPress,
    }
}