import React, {memo} from "react";
import {AddItemForm} from "../../../../../common/components/AddItemForm/AddItemForm";
import {FilterTasksButtons} from "./FilterTasksButtons/FilterTasksButtons";
import {TodolistType} from "../../../../../app/App";
import {Tasks} from "./Tasks/Tasks";
import {TodolistTitle} from "./TodolistTitle/TodolistTitle";
import {addTaskAC} from "../../../model/tasks-reducer";
import {useAppDispatch} from "../../../../../common/hooks/useAppDispatch";

type PropsType = {
    todolist: TodolistType
}

export const Todolist = memo(({todolist}: PropsType) => {

    const dispatch = useAppDispatch()

    const addTask = (title: string) => {
        dispatch(addTaskAC({todolistId: todolist.id, title}))
    }

    return (
        <>
            <TodolistTitle todolist={todolist}/>
            <AddItemForm addItem={addTask}/>
            <Tasks todolist={todolist}/>
            <FilterTasksButtons todolist={todolist}/>
        </>
    );
})


