import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export type ThemeOptions = "light" | "dark"

interface ThemeState{
    theme: ThemeOptions
}

const THEME_LOCAL_KEY = "deliver_theme_local"

const initState : ThemeState = {
    theme: localStorage.getItem(THEME_LOCAL_KEY) as ThemeOptions || "dark"
}

const themeSlice = createSlice({
    name: "theme-slice",
    initialState: initState,
    reducers: {
        changeTheme(state, action: PayloadAction<"dark"|"light">){
            state.theme = action.payload
            localStorage.setItem(THEME_LOCAL_KEY, action.payload)
        }
    }
})


const theme = themeSlice.reducer

export const { changeTheme } = themeSlice.actions
export default theme