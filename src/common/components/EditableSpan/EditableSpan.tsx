import React, {ChangeEvent, KeyboardEvent, memo, useState} from "react";
import TextField from '@mui/material/TextField';

type Props = {
    value: string
    onChange: (newTitle: string) => void
}

export const EditableSpan = memo((props: Props) => {

    console.log("EditableSpan is called")

    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(props.value)


    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.value)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if(event.key === 'Enter') {
          activateViewMode()
      }
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    return (
        editMode
            ? <TextField variant='standard'
                         label='Correct the title'
                         value={title}
                         onChange={onChangeHandler}
                         onBlur={activateViewMode}
                         onKeyDown={onKeyDownHandler}
                         autoFocus/>
            : <span onDoubleClick={activateEditMode}>{props.value}</span>
    )
})