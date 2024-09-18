import React, {useReducer, useState} from 'react';
import './app/App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import {MenuButton} from "./MenuButton";
import {createTheme, ThemeProvider} from '@mui/material/styles'
import {CssBaseline, Switch} from "@mui/material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string,
    filter: FilterValuesType
}
export type TaskType = {
    id: string
    title: string,
    isDone: boolean
}
// export type TasksStateType = {
//     [key: string]: TaskType[]
// }

type ThemeMode = 'dark' | 'light'


function AppWithReducers() {

    let todolistId1 = v1()
    let todolistId2 = v1()

    const [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
            {id: todolistId1, title: 'What to learn', filter: 'all'},
            {id: todolistId2, title: 'What to buy', filter: 'completed'},
        ]
    )

    const [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: 'HTML & SCC', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'rest API', isDone: false},
            {id: v1(), title: 'graphQL', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'RestAPI', isDone: false},
            {id: v1(), title: 'RTK', isDone: false},
        ]
    })

    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const theme = createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary: {
                main: '#32b0a2'
            }
        }
    })

    /* function removeTask(todolistId: string, id: string) {
         let todolistTasks = tasks[todolistId]
         tasks[todolistId] = todolistTasks.filter(task => task.id !== id)
         setTasks({...tasks})
     }*/
    // const removeTask = (todolistId: string, id: string) => {
    //     setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== id)})
    // }

    function removeTask(todolistId: string, taskId: string) {
        let sction = removeTaskAC({todolistId, taskId})
        dispatchTasks(sction)
    }

    /*  function addTask(todolistId: string, title: string) {
          let task = {id: v1(), title, isDone: false}
          let todolistTasks = tasks[todolistId]
          tasks[todolistId] = [task, ...todolistTasks]
          setTasks({...tasks})
      }*/
    // const addTask = (todolistId: string, title: string) => {
    //     const newTask = {id: v1(), title, isDone: false}
    //     setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    // }

    function addTask(todolistId: string, title: string) {
        let action = addTaskAC({todolistId, title})
        dispatchTasks(action)
    }

    /*
        function changeTaskStatus(todolistId: string, id: string, isDone: boolean) {
            let todolistTasks = tasks[todolistId]
            let task = todolistTasks.find(t => t.id === id)
            if (task) {
                task.isDone = isDone
                setTasks({...tasks}) // «собери оставшиеся параметры и положи их в массив»
            }
        }*/
    // const changeTaskStatus = (todolistId: string, id: string, isDone: boolean) => {
    //     setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === id ? {...t, isDone} : t)})
    // }

    function changeTaskStatus(todolistId: string, taskId: string, isDone: boolean) {
        let action = changeTaskStatusAC({todolistId, taskId, isDone})
        dispatchTasks(action)
    }

    /*function changeFilter(todolistId: string, value: FilterValuesType) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }

    } */
    // const changeFilter = (todolistId: string, value: FilterValuesType) => {
    //     setTodolists(todolists.map(td => td.id === todolistId ? {...td, filter: value} : td))
    // }

    function changeFilter(id: string, filter: FilterValuesType) {
        let action = changeTodolistFilterAC({id, filter})
        dispatchTodolists(action)
    }

    // const removeTodolist = (todolistId: string) => {
    //     setTodolists(todolists.filter(todolist => todolist.id !== todolistId))
    //     delete tasks[todolistId]
    //     setTasks({...tasks})
    // }

    function removeTodolist(todolistId: string) {
        let action = removeTodolistAC(todolistId)
        dispatchTodolists(action)
        dispatchTasks(action)
    }

    // const addTodolist = (title: string) => {
    //     let newTodolistId = v1()
    //     let newTodolist: TodolistType = {id: newTodolistId, title, filter: 'all'}
    //     setTodolists([newTodolist, ...todolists])
    //     setTasks({
    //         ...tasks, [newTodolistId]: []
    //     })
    // }
    function addTodolist(title: string) {
        let action = addTodolistAC(title)
        dispatchTodolists(action)
        dispatchTasks(action)
    }

    // const changeTaskTitle = (todolistId: string, id: string, newTitle: string) => {
    //     let todolistTasks = tasks[todolistId]
    //     let task = todolistTasks.find(t => t.id === id)
    //     if (task) {
    //         task.title = newTitle
    //         setTasks({...tasks}) // «собери оставшиеся параметры и положи их в массив»
    //     }
    // }

    function changeTaskTitle(todolistId: string, taskId: string, newTitle: string) {
        let action = changeTaskTitleAC({todolistId, taskId, newTitle})
        dispatchTasks(action)
    }

    // const changeTodolistTitle = (todolistId: string, newTitle: string) => {
    //     let todolist = todolists.find(t => t.id === todolistId)
    //     if (todolist) {
    //         todolist.title = newTitle
    //         setTodolists([...todolists])
    //     }
    // }

    function changeTodolistTitle(id: string, title: string) {
        let action = changeTodolistTitleAC({id, title})
        dispatchTodolists(action)
    }

    const changeModeHandler = () => {
        setThemeMode(themeMode == 'light' ? 'dark' : 'light')
    }


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <AppBar position='static' sx={{mb: '30px'}}>
                <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
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
                    <div>
                        <MenuButton onClick={() => {
                            alert('LOGIN')
                        }}>Login</MenuButton>
                        <MenuButton>Logout</MenuButton>
                        <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
                        <Switch color={'default'} onChange={changeModeHandler}/>
                    </div>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container sx={{mb: '30px'}}>
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
                            <Paper sx={{padding: '0 20px 20px 20px'}}
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
        </ThemeProvider>
    );
}

export default AppWithReducers;