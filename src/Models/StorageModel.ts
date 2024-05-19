import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react"
import { Alert } from "react-native";

export const StorageModel = () => {
    // States
    const [todo, setTodo] = useState<Array<Task>>([]);
    const [completed, setCompleted] = useState<Array<Task>>([]);

    // Functions

    // LOAD DATA from STORAGE
    const getData = async () => {
        try {
            let todoData = await AsyncStorage.getItem("todo") ?? "[]";
            setTodo(JSON.parse(todoData));
            let completedData = await AsyncStorage.getItem("completed") ?? "[]";
            setCompleted(JSON.parse(completedData));
        } catch (error) {
            Alert.alert("Error", error as string, [{ text: "OK" }])
        }
    }

    // SAVE TO STORAGE : todo 
    const saveTodo = async () => await AsyncStorage.setItem('todo', JSON.stringify(todo));

    // SAVE TO STORAGE : completed
    const saveCompleted = async () => await AsyncStorage.setItem('completed', JSON.stringify(completed));

    // CREATE TASK
    const createTask = async (task: Task) => {
        let _todo = todo;
        _todo.unshift(task);
        setTodo(_todo);

        // SAVE to STORAGE
        saveCompleted();
        saveTodo();
    }
    const insertTodo = async (task: Task, index: number) => {
        let _todo = todo;
        _todo.splice(index, 1, task);
        await AsyncStorage.setItem('todo', JSON.stringify(_todo));
    }
    // Move TASK todo -> completed
    const moveToCompleted = (index: number) => {

        let _completed = completed; 
        _completed.unshift(todo[index]); // PUSH TASK to copy
        _completed[0].isComplete = true; // UPDATE isCompete of TASK as TRUE
        setCompleted(_completed);  // save copy to original

        let _todo = todo; // Make COPY of todo
        _todo.splice(index, 1); // REMOVE TASK from COPY
        setTodo(_todo) // save COPY to todo

        // SAVE to STORAGE
        saveCompleted();
        saveTodo();
    }

    // MOVE TASK : completed -> todo
    const moveToTodo = (index: number) => {

        let _todo = todo; // Make COPY of todo
        _todo.unshift(completed[index]); // PUSH TASK to COPY
        _todo[0].isComplete = false; // UPDATE isCompete of TASK as FALSE
        setTodo(_todo) // save COPY to todo

        let _completed = completed;   // Make COPY of completed
        _completed.splice(index, 1); // REMOVE TASK from COPY
        setCompleted(_completed);  // save COPY to completed

        // SAVE to STORAGE
        saveCompleted();
        saveTodo();

    }

    return {
        todo,
        completed,
        getData,
        moveToCompleted,
        moveToTodo,
        createTask,
        insertTodo
    }
}