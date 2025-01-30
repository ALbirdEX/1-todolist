import React, {ChangeEvent} from 'react';
import ListItem from "@mui/material/ListItem";
import {getListItemSx} from "./Task.styles";
import CheckBox from "@mui/material/Checkbox";
import {EditableSpan} from "../../../../../../../common/components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {TaskType, TodolistType} from "../../../../../../../app/App";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../../../../model/tasks-reducer";
import {useAppDispatch} from "../../../../../../../common/hooks/useAppDispatch";

type PropsType = {
    todolist: TodolistType
    task: TaskType
}

export const Task = ({todolist, task}: PropsType) => {

    const dispatch = useAppDispatch()

    const removeTaskHandler = () => {
        dispatch(removeTaskAC({todolistId: todolist.id, taskId: task.id}))
    }
    const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const newIsDone = event.currentTarget.checked
        dispatch(changeTaskStatusAC({
            todolistId: todolist.id,
            taskId: task.id,
            isDone: newIsDone
        }))
    }
    const changeTaskTitleHandler = (title: string) => {
        dispatch(changeTaskTitleAC({
            todolistId: todolist.id,
            taskId: task.id,
            newTitle: title
        }))
    }
    return (
        <ListItem
            key={task.id}
            sx={getListItemSx(task.isDone)}>
            <div>
                <CheckBox color='primary'
                          checked={task.isDone}
                          onChange={changeTaskStatusHandler}/>
                <EditableSpan value={task.title}
                              onChange={changeTaskTitleHandler}/>
            </div>
            <IconButton
                onClick={removeTaskHandler}>
                <DeleteForeverIcon color='error'/>
            </IconButton>
        </ListItem>
    )
};