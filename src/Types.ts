interface Task {
    id: string,
    title: string;
    isComplete: boolean;
    isStarred: boolean;
    time?: [number, number, string]; // HH, MM, AM/PM
    date?: [number, number, number];// DD, MM, YYYY
    subTasks?: Array<Task>
}
type RootStackParamList = {
    Main: undefined,
    CreateTask: { task: Task | undefined, index: number }
}

