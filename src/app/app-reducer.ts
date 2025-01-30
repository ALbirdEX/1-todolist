export type ThemeMode = 'dark' | 'light'

type ChangeThemeActionType = ReturnType<typeof changeThemeAC>
type ActionType = ChangeThemeActionType

type InitialState = typeof initialState

const initialState = {
    themeMode: 'light' as ThemeMode,
}

export const appReducer = (state: InitialState = initialState, action: ActionType): InitialState => {
   debugger
    switch (action.type) {
        case 'CHANGE-THEME':
            return {...state, themeMode: action.payload.themeMode}
        default:
            return state
    }
}

export const changeThemeAC = (payload: { themeMode: ThemeMode }) => ({
    type: 'CHANGE-THEME',
    payload
}) as const