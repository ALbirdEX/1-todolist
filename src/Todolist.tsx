import React, {memo, useCallback} from "react";
import {FilterValuesType, TaskType} from "./OldApp";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton"
import FolderDeleteIcon from "@mui/icons-material/FolderDelete";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import Box from '@mui/material/Box'
import {List} from "@mui/material";
import {filterButtonsContainerSx} from "./Todolist.styles";
import {Task} from "./Task";


type PropsType = {
    title: string,
    id: string,
    tasks: Array<TaskType>  // TasksType[]
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    filter: FilterValuesType
    removeTodolist: (id: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
    removeTask: (todolistId: string, taskId: string) => void
    changeTaskTitle: (todolistId: string, id: string, newTitle: string) => void
    changeTaskStatus: (todolistId: string, id: string, isDone: boolean) => void
}

export const Todolist = memo((props: PropsType) => {
    // сокращаем код используя деструктурирующее присваивание, избавляемся от props.
    const {title, id, tasks, filter} = props

    const [animationRef] = useAutoAnimate<HTMLDListElement>()

    const addTask = useCallback((title: string) => {
        props.addTask(id, title)
    }, [id, props.addTask])

    /*   const onAllClickHandler = () => {
           props.changeFilter(props.id, 'all')
       }
       const onActiveClickHandler = () => {
           props.changeFilter(props.id, 'active')
       }
       const onCompletedClickHandler = () => {
           props.changeFilter(props.id, 'completed')
       }*/

    const changeFilterTasksHandler = useCallback((filter: FilterValuesType) => {
        props.changeFilter(id, filter)
    }, [id, props.changeFilter])
    const removeTodolistHandler = () => {
        props.removeTodolist(id)
    }
    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(id, newTitle)
    }, [id, props.changeTodolistTitle])

    let tasksForTodolist = tasks

    switch (filter) {
        case 'active':
            tasksForTodolist = tasks.filter(task => !task.isDone)
            break
        case 'completed':
            tasksForTodolist = tasks.filter(task => task.isDone)
            break
    }

    return (
        <div>
            <h3>
                <EditableSpan value={title}
                              onChange={changeTodolistTitle}/>
                <IconButton
                    onClick={removeTodolistHandler}>
                    <FolderDeleteIcon color='error' fontSize='large'/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            {/*{tasksForTodolist.length === 0
                ? <p><h3>No tasks</h3></p>
                :*/}<List ref={animationRef}>
            {tasksForTodolist.map((task) => <Task removeTask={props.removeTask}
                                                  changeTaskTitle={props.changeTaskTitle}
                                                  changeTaskStatus={props.changeTaskStatus}
                                                  todolistId={id}
                                                  task={task}
                                                  key={task.id}
            />)}
        </List>
            {/*}*/}

            <Box sx={filterButtonsContainerSx}>{
                <ButtonGroup variant="contained" aria-label="Basic button group">
                    <Button onClick={() => changeFilterTasksHandler("all")}
                            color={filter === 'all' ? 'error' : 'primary'}>
                        All</Button>
                    <Button onClick={() => changeFilterTasksHandler("active")}
                            color={filter === 'active' ? 'error' : 'primary'}>
                        Active</Button>
                    <Button onClick={() => changeFilterTasksHandler("completed")}
                            color={filter === 'completed' ? 'error' : 'primary'}>
                        Completed</Button>
                </ButtonGroup>
            }</Box>
        </div>
    );
})


