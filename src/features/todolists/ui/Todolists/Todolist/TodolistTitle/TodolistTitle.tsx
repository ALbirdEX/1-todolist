import React from 'react';
import {EditableSpan} from "../../../../../../common/components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import FolderDeleteIcon from "@mui/icons-material/FolderDelete";
import {TodolistType} from "../../../../../../app/App";
import {changeTodolistTitleAC, removeTodolistAC} from "../../../../model/todolists-reducer";
import {useAppDispatch} from "../../../../../../common/hooks/useAppDispatch";

type PropsType = {
    todolist: TodolistType
}

export const TodolistTitle = ({todolist}: PropsType) => {
    const {id, title} = todolist

    const dispatch = useAppDispatch()

    const removeTodolistHandler = () => {
        dispatch(removeTodolistAC(id))
    }

    const changeTodolistTitle = (newTitle: string) => {
        dispatch(changeTodolistTitleAC({id, title: newTitle}))
    }

    return (
        <div>
            <h3>
                <EditableSpan value={todolist.title}
                              onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolistHandler}>
                    <FolderDeleteIcon color='error' fontSize='large'/>
                </IconButton>
            </h3>
        </div>
    );
};