import React, {ChangeEvent, FocusEvent, KeyboardEvent, useState} from "react";
import {FilterType, TaskType} from "./App";
import {useAutoAnimate} from "@formkit/auto-animate/react";


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
}

export function Todolist(props: PropsType) {

    const [animationRef] = useAutoAnimate<HTMLDListElement>()

    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(props.id,title.trim())
            setTitle("")
        } else {
            setError("______Title is required______")
        }
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        //setError(null) //убиваем ошибку при начале ввода
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

    return (
        <div className={"border-radius"}>
            <h3>{props.title}
                <button onClick={removeTodolistHandler}>✖️</button>
            </h3>
            <div>
                <input placeholder={"Введите название задачи"}
                       value={title}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}
                       onFocus={onFocusHandler}
                       className={error ? "error" : ""}
                />
                <button
                    onClick={addTask}>
                    ➕
                </button>
                {error && <div className={"error-message"}>{error}</div>}
            </div>
            <ol ref={animationRef}>
                {props.tasks.map((task) => {
                    const onClickHandler = () => {
                        props.removeTask(props.id, task.id)
                    }
                    const onChangeStatus = (event: ChangeEvent<HTMLInputElement>) => {
                        let newIsDone = event.currentTarget.checked
                        props.changeTaskStatus(props.id,task.id, newIsDone)
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