import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterType = "all" | "active" | "completed"

function App() {
    /*    let tasks1 = [
            {id: 1, title: "HTML & SCC", isDone: true},
            {id: 2, title: "JS", isDone: true},
            {id: 3, title: "ReactJS", isDone: false},
            {id: 4, title: "rest API", isDone: false},
            {id: 5, title: "graphQL", isDone: false},
        ]*/
    let [tasks, setTasks] = useState([
            {id: v1(), title: "HTML & SCC", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "rest API", isDone: false},
            {id: v1(), title: "graphQL", isDone: false},
        ]
    )

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(task => task.id !== id)
        setTasks(filteredTasks)
    }

    function addTask(title: string) {
        let task = {id: v1(), title, isDone: false}
        let newTasks = [task, ...tasks]
        setTasks(newTasks)
    }

    let [filter, setFilter] = useState<FilterType>("all")

    let tasksForTodolist = tasks

    switch (filter) {
        case "active":
            tasksForTodolist = tasks.filter(task => !task.isDone)
            break
        case "completed":
            tasksForTodolist = tasks.filter(task => task.isDone)
            break
    }

    function changeFilter(value: FilterType) {
        setFilter(value)
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
            />
        </div>
    );
}


export default App;
