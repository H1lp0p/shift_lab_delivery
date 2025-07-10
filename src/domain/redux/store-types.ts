import type { reducersBoundle } from "./slices";
import type { createStore} from "./store";

export type RootState = ReturnType<typeof reducersBoundle>

export type AppStore = ReturnType<typeof createStore>

export type AppDispatch = AppStore["store"]["dispatch"]

export type Dependencies = {

}

export type ThunkDeps = Dependencies