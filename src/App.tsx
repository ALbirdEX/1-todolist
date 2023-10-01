import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

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
            {id: 1, title: "HTML & SCC", isDone: true},
            {id: 2, title: "JS", isDone: true},
            {id: 3, title: "ReactJS", isDone: false},
            {id: 4, title: "rest API", isDone: false},
            {id: 5, title: "graphQL", isDone: false},
        ]
    )

    function removeTask(id: number) {
        let filteredTasks = tasks.filter(task => task.id !== id)
        setTasks(filteredTasks)
    }

    let [filter, setFilter] = useState<FilterType>("all")

    let tasksForTodolist = tasks
/*    if (filter === "active") {
        tasksForTodolist = tasks.filter(task => task.isDone === false)
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(task => task.isDone === true)
    }
    */
    switch (filter) {
        case "active":
            tasksForTodolist = tasks.filter(task => task.isDone === false)
            break
        case "completed":
            tasksForTodolist = tasks.filter(task => task.isDone === true)
            break
    }

    function changeFilter(value: FilterType) {
        setFilter(value)
    }

    // const task2 = [
    //     {id: 1, title: "Hello world", isDone: true},
    //     {id: 2, title: "I am Happy", isDone: false},
    //     {id: 3, title: "Yo", isDone: false},
    // ]
    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
            {/*<Todolist title="Song" tasks={task2}/>*/}
        </div>
    );
}


export default App;
