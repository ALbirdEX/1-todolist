import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from '../tasks-reducer'
import {TasksStateType} from '../../../../OldApp'
import {addTodolistAC, removeTodolistAC} from "../todolists-reducer";

let startState: TasksStateType

beforeEach(() => {
    startState = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }
})


test('correct task should be deleted from correct array', () => {

    //const action = removeTaskAC('2', 'todolistId2')

    //const endState = tasksReducer(startState, action)
    const endState = tasksReducer(
        startState,
        removeTaskAC({
            todolistId: 'todolistId2',
            taskId: '2'
        })
    )

    expect(endState).toEqual({
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '3', title: 'tea', isDone: false}
        ]
    })
})
test('correct task should be added to correct array', () => {


    const endState = tasksReducer(
        startState,
        addTaskAC({
            todolistId: 'todolistId2',
            title: 'juce'
        })
    )

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juce')
    expect(endState['todolistId2'][0].isDone).toBe(false)
})

test('status of specified task should be changed', () => {

    const endState = tasksReducer(
        startState,
        changeTaskStatusAC({
            todolistId: 'todolistId2',
            taskId: '2',
            isDone: false
        })
    )

    expect(endState['todolistId2']['1'].isDone).toBe(false)
    expect(endState['todolistId1']['1'].isDone).toBe(true)
})

test('title of specified task should be changed', () => {

    const endState = tasksReducer(
        startState,
        changeTaskTitleAC({
            todolistId: 'todolistId1',
            taskId: '3',
            newTitle: 'TS'
        })
    )

    expect(endState['todolistId1']['2'].title).toBe('TS')
    expect(endState['todolistId1'].length).toBe(3)
})

test('new array should be added when new todolist is added', () => {

    const action = addTodolistAC('new todolist')

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})
test('property with todolistId should be deleted', () => {

    const action = removeTodolistAC('todolistId2')

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})
