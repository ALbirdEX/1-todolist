import React from 'react';
import {List} from "@mui/material";
import {TodolistType} from "../../../../../../app/App";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import {Task} from "./Task/Task";
import {useAppSelector} from "../../../../../../common/hooks/useAppSelector";
import {tasksSelectors} from "../../../../model/tasksSelectors";

type PropsType = {
    todolist: TodolistType
}

export const Tasks = ({todolist}: PropsType) => {

    const [animationRef] = useAutoAnimate<HTMLDListElement>()

    const tasks = useAppSelector(tasksSelectors)

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

    return <>
            {tasksForTodolist.length === 0
                ? <p><h3>No tasks</h3></p>
                : <List ref={animationRef}>
                    {tasksForTodolist.map(task =>
                        <Task task={task}
                              todolist={todolist}/>
                    )}
                </List>}
        </>
};
//TODO  зачкм второй ретерн и круглые скобки
// return (
//     <>
//       {tasksForTodolist.length === 0 ? (
//         <p>Тасок нет</p>
//       ) : (
//         <List>
//           {tasksForTodolist.map(task => {
//             return <Task task={task} todolist={todolist} />
//           })}
//         </List>
//       )}
//     </>
//   )