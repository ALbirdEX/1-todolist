import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

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
            const todolistTasks = copyState[action.todolistId]
            copyState[action.todolistId] = todolistTasks.filter(task => task.id !== action.taskId)
            return {...copyState}
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const task = {id: v1(), title: action.title, isDone: false}
            const todolistTasks = stateCopy[action.todolistId]
            stateCopy[action.todolistId] = [task, ...todolistTasks]
            return {...stateCopy}
        }
        case 'CHANGE-TASK-STATUS': {
            const stateCopy = {...state}
            const todolistTasks = stateCopy[action.todolistId]
            const task = todolistTasks.find(t => t.id === action.taskId)
            if (task) {
                task.isDone = action.isDone
            }
            return {...stateCopy}
        }
        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state}
            const todolistTasks = stateCopy[action.todolistId]
            const task = todolistTasks.find(t => t.id === action.taskId)
            if (task) {
                task.title = action.title
            }
            return {...stateCopy}
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.todolistId]: []}
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }

        default:
            throw new Error('I don\'t understand this type')
    }
}
export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todolistId, taskId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', todolistId, title}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', todolistId, taskId, isDone}
}
export const changeTaskTitleAC = (taskId: string, newTitle: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', todolistId, taskId, title: newTitle}
}
