import React, {ChangeEvent, FocusEvent, KeyboardEvent, useState} from "react";

export type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title.trim())
            setTitle("")
        } else {
            setError("Title is required")
        }
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        //setError(null) //убиваем ошибку при начале ввода
        if (event.key === "Enter" && event.altKey) {
            addItem()
        }
    }
    const onFocusHandler = (event: FocusEvent<HTMLInputElement>) => {
        //убиваем ошибку при фокусе
        if (!event.defaultPrevented) {
            setError(null)
        }
    }

    return (
        <div>
            <input placeholder={"Введите название задачи"}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyDownHandler}
                   onFocus={onFocusHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={addItem}>➕</button>
            {error && <div className={"error-message"}>{error}</div>}
        </div>
    )
}