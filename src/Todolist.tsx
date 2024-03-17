import React, {ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./App";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton"
import FolderDeleteIcon from "@mui/icons-material/FolderDelete";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import CheckBox from "@mui/material/Checkbox";

type PropsType = {
    title: string,
    id: string,
    tasks: Array<TaskType>  // TasksType[]
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, id: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodolist: (id: string) => void
    changeTaskTitle: (todolistId: string, id: string, newTitle: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {

    const [animationRef] = useAutoAnimate<HTMLDListElement>()

    const addTask = (title: string) => {
        props.addTask(props.id, title)
    }
    const onAllClickHandler = () => {
        props.changeFilter(props.id, 'all')
    }
    const onActiveClickHandler = () => {
        props.changeFilter(props.id, 'active')
    }
    const onCompletedClickHandler = () => {
        props.changeFilter(props.id, 'completed')
    }
    const removeTodolistHandler = () => {
        props.removeTodolist(props.id)
    }
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }

    return (
        <div>
            <h3>
                <EditableSpan value={props.title}
                              onChange={changeTodolistTitle}/>
                <IconButton
                    onClick={removeTodolistHandler}>
                    <FolderDeleteIcon color='error' fontSize='large'/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ol ref={animationRef}>
                {props.tasks.map((task) => {
                    const onClickHandler = () => {
                        props.removeTask(props.id, task.id)
                    }
                    const onChangeStatus = (event: ChangeEvent<HTMLInputElement>) => {
                        let newIsDone = event.currentTarget.checked
                        props.changeTaskStatus(props.id, task.id, newIsDone)
                    }
                    const changeTaskTitle = (newTitle: string) => {
                        props.changeTaskTitle(props.id, task.id, newTitle)
                    }
                    return (
                        <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                            <CheckBox color='primary'
                                      checked={task.isDone}
                                      onChange={onChangeStatus}/>
                            <EditableSpan value={task.title}
                                          onChange={changeTaskTitle}/>
                            <IconButton
                                onClick={onClickHandler}>
                                <DeleteForeverIcon color='error'/>
                            </IconButton>
                        </li>
                    )
                })}
            </ol>
            <div>
                <ButtonGroup variant="contained" aria-label="Basic button group">
                    <Button onClick={onAllClickHandler}
                        color={props.filter === 'all' ? 'error' : 'primary'}>
                        All</Button>
                    <Button onClick={onActiveClickHandler}
                        color={props.filter === 'active' ? 'error' : 'primary'}>
                        Active</Button>
                    <Button onClick={onCompletedClickHandler}
                        color={props.filter === 'completed' ? 'error' : 'primary'}>
                        Completed</Button>
                </ButtonGroup>

            </div>
        </div>
    );
}


