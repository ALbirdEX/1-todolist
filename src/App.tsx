import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";

export type FilterType = 'all' | 'active' | 'completed'

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
            {id: todolistID1, title: 'What to learn', filter: 'all'},
            {id: todolistID2, title: 'What to buy', filter: 'completed'},
        ]
    )

    const [tasks, setTasks] = useState<TasksStateType>(
        {
            [todolistID1]: [
                {id: v1(), title: 'HTML & SCC', isDone: true},
                {id: v1(), title: 'JS', isDone: true},
                {id: v1(), title: 'ReactJS', isDone: false},
                {id: v1(), title: 'rest API', isDone: false},
                {id: v1(), title: 'graphQL', isDone: false},
            ],
            [todolistID2]: [
                {id: v1(), title: 'RestAPI', isDone: false},
                {id: v1(), title: 'RTK', isDone: false},
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

    function changeFilter(todolistId: string, value: FilterType) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }

    }

    function removeTodolist(id: string) {
        setTodolists(todolists.filter(todolist => todolist.id !== id))
        delete tasks[id]
        setTasks({...tasks})
    }

    function addTodolist(title: string) {
        let newTodolistId = v1()
        let newTodolist: TodolistType = {id: newTodolistId, title, filter: 'all'}
        setTodolists([newTodolist, ...todolists])
        setTasks({
            ...tasks, [newTodolistId]: []
        })
    }

    function changeTaskTitle(todolistId: string, id: string, newTitle: string) {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(t => t.id === id)
        if (task) {
            task.title = newTitle
            setTasks({...tasks}) // «собери оставшиеся параметры и положи их в массив»
        }
    }

    function changeTodolistTitle(todolistId: string, newTitle: string) {
        let todolist = todolists.find(t => t.id === todolistId)
        if (todolist) {
            todolist.title = newTitle
            setTodolists([...todolists])
        }
    }

    return (
        <div className='App'>
            <AppBar position='static'>
                <Toolbar>
                    <IconButton color='inherit'
                                edge='start'
                                aria-label='menu'
                                onClick={() => {
                                    alert('Menu')
                                }}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant='h4'>
                        Todolist
                    </Typography>
                    <Button color='inherit'
                            onClick={() => {
                                alert('LOGIN')
                            }}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container
                      style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={4}>
                    {todolists.map(todolist => {
                        let allTodolistTasks = tasks[todolist.id]
                        let tasksForTodolist = allTodolistTasks

                        switch (todolist.filter) {
                            case 'active':
                                tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
                                break
                            case 'completed':
                                tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
                                break
                        }
                        return <Grid>
                            <Paper style={{padding: '10px'}}
                                   elevation={24}>
                                <Todolist key={todolist.id}
                                          title={todolist.title}
                                          id={todolist.id}
                                          tasks={tasksForTodolist}
                                          removeTask={removeTask}
                                          changeFilter={changeFilter}
                                          addTask={addTask}
                                          changeTaskStatus={changeTaskStatus}
                                          filter={todolist.filter}
                                          removeTodolist={removeTodolist}
                                          changeTaskTitle={changeTaskTitle}
                                          changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;