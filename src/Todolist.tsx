import React, {FocusEvent, ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterType} from "./App";
import {useAutoAnimate} from "@formkit/auto-animate/react";

type TasksType = {
    id: string,
    title: string,
    isDone: boolean,
}

type PropsType = {
    title: string,
    tasks: Array<TasksType>  // TasksType[]
    removeTask: (taskID: string) => void
    changeFilter: (value: FilterType) => void
    addTask: (title: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
    filter: FilterType
}

export function Todolist(props: PropsType) {

    const [animationRef] = useAutoAnimate<HTMLDListElement>()

    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(title.trim())
            setTitle("")
        } else {
            setError("______Title is required______")
        }
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        //setError("") //убиваем ошибку при начале ввода
        if (event.key === "Enter" && event.altKey) {
            addTask()
        }
    }
    const onFocusHandler = (event: FocusEvent<HTMLInputElement>) => {
        if (!event.defaultPrevented) {
            setError(null)
        }
    }
    const onAllClickHandler = () => {
        props.changeFilter("all")
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active")
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed")
    }

    return (
        <div className={"border-radius"}>
            <h3>{props.title}</h3>
            <div>
                <input placeholder={"Введите название задачи"}
                       value={title}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}
                       onFocus={onFocusHandler}
                       className={error ? "error": ""}
                />
                <button
                    onClick={addTask}>
                    ➕
                </button>
                {error && <div className={error ? "error-message" : ""}>{error}</div>}
            </div>
            <ol ref={animationRef}>
                {props.tasks.map((task) => {
                    const onClickHandler = () => {
                        props.removeTask(task.id)
                    }
                    const onChangeStatus = (event: ChangeEvent<HTMLInputElement>) => {
                        let newIsDone = event.currentTarget.checked
                        props.changeTaskStatus(task.id, newIsDone)
                    }
                    return (
                        <li key={task.id} className={task.isDone ? "is-done" : ""}>
                            <input type="checkbox"
                                   checked={task.isDone}
                                   onChange={onChangeStatus}/>
                            <span>{task.title}</span>
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