import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import TextField from '@mui/material/TextField';
import IconButton from "@mui/material/IconButton";
import AddBox from "@mui/icons-material/AddBox";


export type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        //setError(null) //убиваем ошибку при начале ввода
        if (event.key === 'Enter' && event.altKey) {
            addItem()
        }
    }
    //убиывем ошибку
    const onBlurHandler = () => {
        if (error) {
            setError(null)
        }
    }

    return (
        <div>
            <TextField variant='outlined'
                       value={title}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}
                       error={!!error}
                       label='Write the titl'
                       helperText={error}
            />
            <IconButton
                color='primary'
                onClick={addItem}
                onBlur={onBlurHandler}>
                <AddBox/>
            </IconButton>
        </div>
    )
}