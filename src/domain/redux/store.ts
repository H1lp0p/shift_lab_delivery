import { configureStore } from "@reduxjs/toolkit"
import { reducersBoundle } from "./slices"
import type { RootState } from "./store-types"


export const createStore = (preloaded?: Partial<RootState>) => {

    const store = configureStore({
        reducer: reducersBoundle,
    })

    return {store}
}