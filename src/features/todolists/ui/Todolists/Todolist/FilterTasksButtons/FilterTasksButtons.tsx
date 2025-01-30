import React, {useCallback} from 'react';
import Box from "@mui/material/Box";
import {filterButtonsContainerSx} from "./FilterTasksButtons.styles";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import {FilterValuesType} from "../../../../../../OldApp";
import {TodolistType} from "../../../../../../app/App";
import {changeTodolistFilterAC} from "../../../../model/todolists-reducer";
import {useAppDispatch} from "../../../../../../common/hooks/useAppDispatch";

type PropsType = {
    todolist: TodolistType
}

export const FilterTasksButtons = ({todolist}: PropsType) => {

    const {id, filter} = todolist

    const dispatch = useAppDispatch()

    const changeFilterTasksHandler = useCallback((filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC({id, filter}))
    }, [dispatch])
    return (
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
    );
};