import { useNavigation } from "@react-navigation/native"
import React, { useCallback, useContext, useState } from "react";
import { AppContext } from "../AppContext";
import { useTheme } from "react-native-paper";

export const CreateTaskViewModel = (task: Task | undefined, index?: number) => {
    // States
    const navigation = useNavigation();
    const { createTask, insertTodo } = useContext(AppContext);
    const [title, setTitle] = useState(task ? task?.title : "");
    const [isStarred, setIsStarred] = useState(task ? task?.isStarred : false);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [date, setDate] = useState(undefined);
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
    const openDateModal = () => {
        setIsDatePickerOpen(true)
    }
    const onDateModalDismiss = useCallback(() => {
        setIsDatePickerOpen(false);
    }, [setIsDatePickerOpen])
    const onDateConfirm = useCallback((params:any) => {
        setIsDatePickerOpen(false);
        setDate(params.date);
    }, [setIsDatePickerOpen, setDate])
    return {
        theme,
        title,
        date,
        isStarred,
        onTitleChange,
        onStarPress,
        onbackButtonPress,
        onCreateButtonPress,
        openDateModal,
        isDatePickerOpen,
        onDateModalDismiss,
        onDateConfirm
    }
}