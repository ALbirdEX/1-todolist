import React, {useState} from 'react';
import './App.css';
import {Todolist} from "../Todolist";
import {AddItemForm} from "../AddItemForm";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import {MenuButton} from "../MenuButton";
import {createTheme, ThemeProvider} from '@mui/material/styles'
import {CssBaseline, Switch} from "@mui/material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "../state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";

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

function App() {

    //выберам из глобальго state то чтотнам необходимо, указываяобщий тип и тип того что выбираем
    const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolist)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.task)

    const dispatch = useDispatch()

    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const theme = createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary: {
                main: '#32b0a2'
            }
        }
    })

    function removeTask(todolistId: string, taskId: string) {
        let sction = removeTaskAC({todolistId, taskId})
        dispatch(sction)
    }

    function addTask(todolistId: string, title: string) {
        let action = addTaskAC({todolistId, title})
        dispatch(action)
    }

    function changeTaskStatus(todolistId: string, taskId: string, isDone: boolean) {
        let action = changeTaskStatusAC({todolistId, taskId, isDone})
        dispatch(action)
    }

    function changeFilter(id: string, filter: FilterValuesType) {
        let action = changeTodolistFilterAC({id, filter})
        dispatch(action)
    }

    function removeTodolist(todolistId: string) {
        let action = removeTodolistAC(todolistId)
        dispatch(action)
    }

    function addTodolist(title: string) {
        let action = addTodolistAC(title)
        dispatch(action)
    }

    function changeTaskTitle(todolistId: string, taskId: string, newTitle: string) {
        let action = changeTaskTitleAC({todolistId, taskId, newTitle})
        dispatch(action)
    }

    function changeTodolistTitle(id: string, title: string) {
        let action = changeTodolistTitleAC({id, title})
        dispatch(action)
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
                        return <Grid key={todolist.id}>
                            <Paper sx={{padding: '0 20px 20px 20px'}}
                                   elevation={24}>
                                <Todolist title={todolist.title}
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

export default App;