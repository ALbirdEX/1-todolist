import React, {ChangeEvent, useState} from "react";

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

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    return (
        editMode
            ? <input value={title} onChange={onChangeHandler} onBlur={activateViewMode} autoFocus/>
            : <span onDoubleClick={activateEditMode}>{props.value}</span>
    )
}