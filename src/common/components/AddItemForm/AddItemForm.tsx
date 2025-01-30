import React, {ChangeEvent, KeyboardEvent, memo, useState} from "react";
import TextField from '@mui/material/TextField';
import IconButton from "@mui/material/IconButton";
import AddBoxIcon from "@mui/icons-material/AddBox";


export type Props = {
    addItem: (title: string) => void
}

export const AddItemForm = memo(function ({addItem}: Props) {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addItemHandler = () => {
        if (title.trim() !== '') {
            addItem(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null) //убиваем ошибку при начале ввода
        if (event.key === 'Enter' && event.altKey) {
            addItemHandler()
        }
    }
    //убиывем ошибку
    const offErrorHandler = () => {
        if (error !== null) {
            setError(null)
        }
    }

    return (
        <div>
            <TextField variant='outlined'
                       value={title}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}
                       onBlur={offErrorHandler}
                       onFocus={offErrorHandler}
                       error={!!error}
                       label='Write the titl'
                       helperText={error}
                       size="small"
            />
            <IconButton
                color='primary'
                onClick={addItemHandler}
                onBlur={offErrorHandler}
            >
                <AddBoxIcon/>
            </IconButton>
        </div>
    )
})