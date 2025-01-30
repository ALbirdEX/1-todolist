import React, {useState} from 'react';
import './app/App.css';
import {Todolist} from "./features/todolists/ui/Todolists/Todolist/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./common/components/AddItemForm/AddItemForm";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import {MenuButton} from "./common/components/MenuButton/MenuButton";
import {createTheme, ThemeProvider} from '@mui/material/styles'
import {CssBaseline, Switch} from "@mui/material";


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
export type TasksStateType = {
    [key: string]: TaskType[]
}

type ThemeMode = 'dark' | 'light'


function OldApp() {

    let todolistId1 = v1()
    let todolistId2 = v1()

    const [todolists, setTodolists] = useState<TodolistType[]>(
        [
            {id: todolistId1, title: 'What to learn', filter: 'all'},
            {id: todolistId2, title: 'What to buy', filter: 'completed'},
        ]
    )

    const [tasks, setTasks] = useState<TasksStateType>({
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
    const removeTask = (todolistId: string, id: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== id)})
    }

    /*  function addTask(todolistId: string, title: string) {
          let task = {id: v1(), title, isDone: false}
          let todolistTasks = tasks[todolistId]
          tasks[todolistId] = [task, ...todolistTasks]
          setTasks({...tasks})
      }*/
    const addTask = (todolistId: string, title: string) => {
        const newTask = {id: v1(), title, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
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
    const changeTaskStatus = (todolistId: string, id: string, isDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === id ? {...t, isDone} : t)})
    }

    /*function changeFilter(todolistId: string, value: FilterValuesType) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }

    } */
    const changeFilter = (todolistId: string, value: FilterValuesType) => {
        setTodolists(todolists.map(td => td.id === todolistId ? {...td, filter: value} : td))
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(todolist => todolist.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    const addTodolist = (title: string) => {
        let newTodolistId = v1()
        let newTodolist: TodolistType = {id: newTodolistId, title, filter: 'all'}
        setTodolists([newTodolist, ...todolists])
        setTasks({
            ...tasks, [newTodolistId]: []
        })
    }

    const changeTaskTitle = (todolistId: string, id: string, newTitle: string) => {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(t => t.id === id)
        if (task) {
            task.title = newTitle
            setTasks({...tasks}) // «собери оставшиеся параметры и положи их в массив»
        }
    }

    const changeTodolistTitle = (todolistId: string, newTitle: string) => {
        let todolist = todolists.find(t => t.id === todolistId)
        if (todolist) {
            todolist.title = newTitle
            setTodolists([...todolists])
        }
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
                                    //title={todolist.title}
                                    //id={todolist.id}
                                    //filter={todolist.filter}
                                          todolist={todolist}
                                          //tasks={tasksForTodolist}
                                          //removeTask={removeTask}
                                          //changeFilter={changeFilter}
                                          //addTask={addTask}
                                          //changeTaskStatus={changeTaskStatus}
                                          //removeTodolist={removeTodolist}
                                          //changeTaskTitle={changeTaskTitle}
                                          //changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </ThemeProvider>
    );
}

export default OldApp;