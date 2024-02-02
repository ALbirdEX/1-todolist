import React, {ChangeEvent} from "react";
import {FilterType, TaskType} from "./App";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type PropsType = {
    title: string,
    id: string,
    tasks: Array<TaskType>  // TasksType[]
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, value: FilterType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, id: string, isDone: boolean) => void
    filter: FilterType
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
        props.changeFilter(props.id, "all")
    }
    const onActiveClickHandler = () => {
        props.changeFilter(props.id, "active")
    }
    const onCompletedClickHandler = () => {
        props.changeFilter(props.id, "completed")
    }
    const removeTodolistHandler = () => {
        props.removeTodolist(props.id)
    }
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }

    return (
        <div className={"border-radius"}>
            <h3>
                <EditableSpan value={props.title}
                              onChange={changeTodolistTitle}/>
                <button onClick={removeTodolistHandler}>✖️</button>
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
                        <li key={task.id} className={task.isDone ? "is-done" : ""}>
                            <input type="checkbox"
                                   checked={task.isDone}
                                   onChange={onChangeStatus}/>
                            <EditableSpan value={task.title}
                                          onChange={changeTaskTitle}/>
                            <button
                                onClick={onClickHandler}>
                                ✖️
                            </button>
                        </li>
                    )
                })}
            </ol>
            <div>
                <button className={props.filter === "all" ? "active-filter" : "passive-filter"}
                        onClick={onAllClickHandler}>
                    All
                </button>
                <button className={props.filter === "active" ? "active-filter" : "passive-filter"}
                        onClick={onActiveClickHandler}>
                    Active
                </button>
                <button className={props.filter === "completed" ? "active-filter" : "passive-filter"}
                        onClick={onCompletedClickHandler}>
                    Completed
                </button>
            </div>
        </div>
    );
}


