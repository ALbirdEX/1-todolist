import {v1} from "uuid"
import {FilterValuesType, TodolistType} from "../../../../OldApp";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "../todolists-reducer";

let todolistId1: string
let todolistId2: string
let startState: TodolistType[]

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'completed'},
    ]
})

test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {

    const newTodolistTitle = 'New Todolist'

    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)
})

test('correct todolist should change it\'s name', () => {

    let newTodolistTitle = 'New Todolist'

    /*
        const action = {                              //можно было action: ChangeTodolistTitleActionType
            type: 'CHANGE-TODOLIST-TITLE' as const,
            payload.{
            id: todolistId2,
            title: newTodolistTitle
        }}as const
    */

    const endState = todolistsReducer(startState,
        changeTodolistTitleAC({
            id: todolistId2,
            title: newTodolistTitle
        })
    )

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = 'completed'

    /*const action = {
        type: 'CHANGE-TODOLIST-FILTER' as const,
        payload: {
      id: todolistId2,
      title: 'New Todolist',
    },
    }*/

    const endState = todolistsReducer(
        startState,
        changeTodolistFilterAC({
            id: todolistId2,
            filter: newFilter
        })
    )

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})

