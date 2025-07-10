import { useSelector, type TypedUseSelectorHook } from "react-redux";
import type { RootState } from "../redux/store-types";

export const useMySelector: TypedUseSelectorHook<RootState> = useSelector;