import { createContext } from "react";

type contextType = {
    todo: Array<Task>,
    completed: Array<Task>,
    moveToCompleted: (index: number) => void,
    moveToTodo: (index: number) => void,
    createTask: (task: Task) => void,
    insertTodo: (task: Task, index: number) => void,
}

export const AppContext = createContext<contextType>({
    todo: [],
    completed: [],
    moveToCompleted: () => { },
    moveToTodo: () => { },
    createTask: () => { },
    insertTodo: () => { }
});