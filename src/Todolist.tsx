import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterType} from "./App";

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
}

export function Todolist(props: PropsType) {
    let [title, setTitle] = useState("")

    const addTask = () => {
        props.addTask(title)
        setTitle("")
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            addTask()
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
        <div>
            <h3>{props.title}</h3>
            <div>
                <input placeholder={"Введите название задачи"}
                       value={title}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}
                />
                <button
                    onClick={addTask}>
                    ➕
                </button>
            </div>
            <ul>
                {props.tasks.map((task) => {

                    const onClickHandler = () => {
                        props.removeTask(task.id)
                    }

                    return (
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
                            <button
                                onClick={onClickHandler}>
                                ✖️
                            </button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button
                    onClick={onAllClickHandler}>
                    All
                </button>
                <button
                    onClick={onActiveClickHandler}>
                    Active
                </button>
                <button
                    onClick={onCompletedClickHandler}>
                    Completed
                </button>
            </div>
        </div>
    );
}