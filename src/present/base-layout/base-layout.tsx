import { Outlet } from "react-router";
import { Header } from "../header/header";
import css from './base-layout.module.css'

export const BaseLayout: React.FC = () => {
    return (
        <div className={css.baseLayout}>
            <Header/>
            <div className={css.content}>
                <Outlet/>
            </div>
        </div>
    );
}