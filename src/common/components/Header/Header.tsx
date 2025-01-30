import {changeThemeAC} from "../../../app/app-reducer";
import React from "react";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import {MenuButton} from "../MenuButton/MenuButton";
import {Switch} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import {getTheme} from "../../theme/theme";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {useAppSelector} from "../../hooks/useAppSelector";

export const Header = () => {
    //выберам из глобальго state то чтотнам необходимо, указываяобщий тип и тип того что выбираем
    const themeMode = useAppSelector(state => state.app.themeMode)

    const dispatch = useAppDispatch()

    const theme = getTheme(themeMode)

    const changeModeHandler = () => {
        dispatch(changeThemeAC({themeMode: themeMode === 'light' ? 'dark' : 'light'}))
    }

    return (
        <AppBar position='static' sx={{mb: '30px'}}>
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                <IconButton color='inherit'
                            edge='start'
                            aria-label='menu'
                            onClick={() => {
                                alert('Menu')
                            }}>
                    <MenuIcon/>
                </IconButton>
                <Typography variant='h4'>
                    Todolist
                </Typography>
                <div>
                    <MenuButton onClick={() => {
                        alert('LOGIN')
                    }}>Login</MenuButton>
                    <MenuButton>Logout</MenuButton>
                    <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
                    <Switch color={'default'} onChange={changeModeHandler}/>
                </div>
            </Toolbar>
        </AppBar>
    )
}