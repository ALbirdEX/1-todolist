import React from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist/Todolist";
import {useAppSelector} from "../../../../common/hooks/useAppSelector";
import {todolistsSelectors} from "../../model/todolistsSelectors";

export const Todolists = () => {

    const todolists = useAppSelector(todolistsSelectors)

    return (
        <>
            {todolists.map(todolist => {
                return <Grid key={todolist.id}>
                    <Paper sx={{padding: '0 20px 20px 20px'}}
                           elevation={24}>
                        <Todolist key={todolist.id}
                                  todolist={todolist}
                            //addTask={addTask}
                        />
                    </Paper>
                </Grid>
            })}
        </>
    );
};