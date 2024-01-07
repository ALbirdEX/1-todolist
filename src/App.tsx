import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterType = "all" | "active" | "completed"

type TodolistType = {
    id: string
    title: string,
    filter: FilterType
}
export type TaskType = {
    id: string
    title: string,
    isDone: boolean
}
export type TasksStateType = {
    [key: string]: TaskType[]
}


function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    const [todolists, setTodolists] = useState<TodolistType[]>(
        [
            {id: todolistID1, title: "What to learn", filter: "all"},
            {id: todolistID2, title: "What to buy", filter: "completed"},
        ]
    )

    /*    let tasks1 = [
            {id: 1, title: "HTML & SCC", isDone: true},
            {id: 2, title: "JS", isDone: true},
            {id: 3, title: "ReactJS", isDone: false},
            {id: 4, title: "rest API", isDone: false},
            {id: 5, title: "graphQL", isDone: false},
        ]*/
    const [tasks, setTasks] = useState<TasksStateType>(
        {
            [todolistID1]: [
                {id: v1(), title: "HTML & SCC", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "rest API", isDone: false},
                {id: v1(), title: "graphQL", isDone: false},
            ],
            [todolistID2]: [
                {id: v1(), title: "RestAPI", isDone: false},
                {id: v1(), title: "RTK", isDone: false},
            ]
        }
    )

    function removeTask(todolistId: string, id: string) {
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = todolistTasks.filter(task => task.id !== id)
        setTasks({...tasks})
    }

    function addTask(todolistId: string, title: string) {
        let task = {id: v1(), title, isDone: false}
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = [task, ...todolistTasks]
        setTasks({...tasks})
    }

    function changeTaskStatus(todolistId: string, id: string, isDone: boolean) {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks}) // «собери оставшиеся параметры и положи их в массив»
        }
    }

    /* const [filter, setFilter] = useState<FilterType>("all")*/

    /* let tasksForTodolist = tasks

     switch (filter) {
         case "active":
             tasksForTodolist = tasks.filter(task => !task.isDone)
             break
         case "completed":
             tasksForTodolist = tasks.filter(task => task.isDone)
             break
     }
 */
    function changeFilter(todolistId: string, value: FilterType) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }

    }

    function removeTodolist(id: string) {
        setTodolists(todolists.filter( todolist => todolist.id !== id))
        delete tasks[id]
        setTasks({...tasks})
    }

    return (
        <div className="App">
            {
                todolists.map(todolist => {
                    let allTodolistTasks = tasks[todolist.id]
                    let tasksForTodolist = allTodolistTasks

                    switch (todolist.filter) {
                        case "active":
                            tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
                            break
                        case "completed":
                            tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
                            break
                    }
                    return <Todolist key={todolist.id}
                                     title={todolist.title}
                                     id={todolist.id}
                                     tasks={tasksForTodolist}
                                     removeTask={removeTask}
                                     changeFilter={changeFilter}
                                     addTask={addTask}
                                     changeTaskStatus={changeTaskStatus}
                                     filter={todolist.filter}
                                     removeTodolist={removeTodolist}
                    />
                })
            }
        </div>
    );
}


export default App;
