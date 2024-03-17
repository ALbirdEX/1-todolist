import {StateType, userReducer} from "./user-reducer";

test('use reducer should only age', () => {
    const startState: StateType = {age: 35, childrenCount: 2, name: 'Alex'}

    const endState = userReducer(startState, {type: 'INCREMENT-AGE'})

    expect(endState.age).toBe(36)
    expect(endState.childrenCount).toBe(2)
})

test('use reducer should only childrenCount', () => {
    const startState: StateType = {age: 35, childrenCount: 2, name: 'Alex'}

    const endState = userReducer(startState, {type: 'INCREMENT-CHILDREN-COUNT'})

    expect(endState.childrenCount).toBe(3)
    expect(endState.age).toBe(35)
})

test('use reducer should change user name', () => {
    const startState: StateType = {age: 35, childrenCount: 2, name: 'Alex'}
    const newName = 'Viktor'
    const endState = userReducer(startState, {type: 'CHANGE-NAME', newName: newName})

    expect(endState.name).toBe('Viktor')
})