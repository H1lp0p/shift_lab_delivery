import { Outlet } from "react-router";
import { Header } from "../header/header";

export const BaseLayout: React.FC = () => {
    return (
        <div className="base-layout">
        <Header/>
        <Outlet/>
        </div>
    );
}