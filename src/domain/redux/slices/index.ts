import { combineReducers } from "@reduxjs/toolkit"
import session from "./session-slice"
import theme from "./theme-slice"

export const reducersBoundle = combineReducers({
    session,
    theme,
})