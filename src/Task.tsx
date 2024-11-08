import React, {ChangeEvent, memo, useCallback} from "react";
import ListItem from "@mui/material/ListItem";
import {getListItemSx} from "./Todolist.styles";
import CheckBox from "@mui/material/Checkbox";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {TaskType} from "./OldApp";

type TaskPropsType = {
    removeTask: (todolistId: string, taskId: string) => void
    changeTaskTitle: (todolistId: string, id: string, newTitle: string) => void
    changeTaskStatus: (todolistId: string, id: string, isDone: boolean) => void
    task: TaskType
    todolistId: string
}
export const Task = memo((props: TaskPropsType) => {

    const {todolistId, task} = props

    const onClickHandler = useCallback(() => {
        props.removeTask(todolistId, task.id)
    }, [todolistId, task.id, props.removeTask])
    const onChangeStatus = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        let newIsDone = event.currentTarget.checked
        props.changeTaskStatus(todolistId, task.id, newIsDone)
    }, [todolistId, task.id, props.changeTaskStatus])
    const changeTaskTitle = useCallback((newTitle: string) => {
        props.changeTaskTitle(todolistId, task.id, newTitle)
    }, [todolistId, task.id, props.changeTaskTitle])
    return (<ListItem
            key={task.id}
            sx={getListItemSx(task.isDone)}>
            <div>
                <CheckBox color='primary'
                          checked={task.isDone}
                          onChange={onChangeStatus}/>
                <EditableSpan value={task.title}
                              onChange={changeTaskTitle}/>
            </div>
            <IconButton
                onClick={onClickHandler}>
                <DeleteForeverIcon color='error'/>
            </IconButton>
        </ListItem>
    )
})