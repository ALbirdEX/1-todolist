import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "../state/tasks-reducer";
import {todolistsReducer} from "../state/todolists-reducer";

const rootReducer = combineReducers({
    task: tasksReducer,
    todolist: todolistsReducer
})

export const store = legacy_createStore(rootReducer)

//export type AppRootStateType = ReturnType<typeof rootReducer>

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof store.getState>


//@ts-ignore
window.store = store