import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

//ReturnType<Type> - извлекает тип возвращаемого значения функции Type
//Оператор typeof возвращает строку, указывающую тип операнда
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

/* //типы экшиеов для креатеров
export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    todolistId: string
    title: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    todolistId: string
    taskId: string
    isDone: boolean
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    todolistId: string
    taskId: string
    title: string
}
*/


type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType


export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const copyState = {...state}
            const todolistTasks = copyState[action.payload.todolistId]
            copyState[action.payload.todolistId] = todolistTasks.filter(task => task.id !== action.payload.taskId)
            return {...copyState}
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const task = {id: v1(), title: action.payload.title, isDone: false}
            const todolistTasks = stateCopy[action.payload.todolistId]
            stateCopy[action.payload.todolistId] = [task, ...todolistTasks]
            return {...stateCopy}
        }
        case 'CHANGE-TASK-STATUS': {
            const stateCopy = {...state}
            const todolistTasks = stateCopy[action.payload.todolistId]
            const task = todolistTasks.find(t => t.id === action.payload.taskId)
            if (task) {
                task.isDone = action.payload.isDone
            }
            return {...stateCopy}
        }
        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state}
            const todolistTasks = stateCopy[action.payload.todolistId]
            const task = todolistTasks.find(t => t.id === action.payload.taskId)
            if (task) {
                task.title = action.payload.title
            }
            return {...stateCopy}
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.payload.todolistId]: []}
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.payload.id]
            return stateCopy
        }

        default:
            throw new Error('I don\'t understand this type')
    }
}

//as const уточняет тип этой переменной до ее точного значения или комбинации литеральных типов
// Используется для создания неизменяемых значений и гарантирования того,
// что TypeScript будет рассматривать значения как конкретные литералы, а не расширять типы.
export const removeTaskAC = (taskId: string, todolistId: string) => ({
    type: 'REMOVE-TASK', payload: {todolistId, taskId}
}) as const
export const addTaskAC = (title: string, todolistId: string) => ({
    type: 'ADD-TASK',
    payload: {
        todolistId,
        title
    }
}) as const
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => ({
    type: 'CHANGE-TASK-STATUS',
    payload: {
        todolistId,
        taskId,
        isDone
    }
}) as const
export const changeTaskTitleAC = (taskId: string, newTitle: string, todolistId: string) => ({
    type: 'CHANGE-TASK-TITLE',
    payload: {
        todolistId,
        taskId,
        title: newTitle
    }
}) as const

/*
export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', payload: {todolistId, taskId}}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {
    type: 'ADD-TASK',
    payload: {
        todolistId,
        title
    }}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {
    type: 'CHANGE-TASK-STATUS',
    payload: {
        todolistId,
        taskId,
        isDone
    }}
}
export const changeTaskTitleAC = (taskId: string, newTitle: string, todolistId: string): ChangeTaskTitleActionType => {
    return {
    type: 'CHANGE-TASK-TITLE',
    payload: {
        todolistId,
        taskId,
        title: newTitle
    }}
}*/
