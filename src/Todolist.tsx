import React from "react";
import {FilterType} from "./App";

type TasksType = {
    id: number,
    title: string,
    isDone: boolean,
}

type PropsType = {
    title: string,
    tasks: Array<TasksType>  // TasksType[]
    removeTask: (taskID: number) => void
    changeFilter: (value: FilterType) => void
}

export function Todolist(props: PropsType) {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map((task) => {
                    return (
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
                            <button
                                onClick={() => {props.removeTask(task.id)}}>
                                ✖️
                            </button>
                        </li>
                    )
                })}
            </ul>
            {/*<ul>
                <li><input type="checkbox" checked={props.tasks[0].isDone}/> <span>HTML&CSS</span></li>
                <li><input type="checkbox" checked={props.tasks[1].isDone}/> <span>JS</span></li>
                <li><input type="checkbox" checked={props.tasks[2].isDone}/> <span>React</span></li>
            </ul>*/}
            <div>
                <button
                    onClick={() => {props.changeFilter("all")}}>
                    All
                </button>
                <button
                    onClick={() => {props.changeFilter("active")}}>
                    Active
                </button>
                <button
                    onClick={() => {props.changeFilter("completed")}}>
                    Completed
                </button>
            </div>
        </div>
    );
}