import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import TextField from '@mui/material/TextField';

type EditableSpanPropsType = {
    value: string
    onChange: (newTitle: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {

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
}