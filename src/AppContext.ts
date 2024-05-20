import { createContext } from "react";

type contextType = {
    appTheme: string,
    todo: Array<Task>,
    completed: Array<Task>,
    changeTheme: (value: string) => void,
    moveToCompleted: (index: number) => void,
    moveToTodo: (index: number) => void,
    createTask: (task: Task) => void,
    insertTodo: (task: Task, index: number) => void,
    toggleIsStarred: (index: number) => void,
    undoLastAction: () => void,
}

export const AppContext = createContext<contextType>({
    todo: [],
    completed: [],
    appTheme: 'system',
    changeTheme: () => { },
    moveToCompleted: () => { },
    moveToTodo: () => { },
    createTask: () => { },
    insertTodo: () => { },
    toggleIsStarred: () => { },
    undoLastAction: () => { },
});