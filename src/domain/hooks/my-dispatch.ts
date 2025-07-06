import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store-types";

export const useMyDispatch = () => useDispatch<AppDispatch>();