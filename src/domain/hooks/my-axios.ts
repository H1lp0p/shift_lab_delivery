import type { AxiosInstance } from "axios";
import axios from "axios";
import { useRef } from "react";
import { baseApiUrl } from "../api-path";
import { useMySelector } from "./my-selectior";

export const useAxiosAuth: () => AxiosInstance = () => {
    const axiosInstanceRef = useRef<AxiosInstance | null>(null);

    const token = useMySelector((st) => st.session.token);

    if (!axiosInstanceRef.current){
        axiosInstanceRef.current = axios.create({
            baseURL: baseApiUrl,
            headers: {
                "Authorization": `Bearer ${token}` 
            }
        })
    }

    return axiosInstanceRef.current
}