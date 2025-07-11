import { combineReducers } from "@reduxjs/toolkit"
import session from "./session-slice"
import theme from "./theme-slice"
import createOrder from "./create-order-flow"

export const reducersBoundle = combineReducers({
    session,
    theme,
    createOrder
})