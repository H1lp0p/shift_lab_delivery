import { Link, useLocation } from "react-router";
import { ExitIco, LogoIco, ThemeToDarkIco, ThemeToLightIco, TimeIco, UserIco } from "../icons";
import style from './header.module.css'
import { useMySelector } from "../../domain/hooks/my-selectior";
import { useMyDispatch } from "../../domain/hooks/my-dispatch";
import { changeTheme } from "../../domain/redux/slices/theme-slice";
import { HeaderItem } from "./header-item";

export const Header : React.FC = () => {

    const location = useLocation();

    const curTheme = useMySelector((st) => st.theme.theme)

    const isLoggedIn = useMySelector((st) => st.session.token) != null

    const dispatch = useMyDispatch();

    const togleTheme = () => {
        if (curTheme == "dark"){
            dispatch(changeTheme("light"))
        }
        else{
            dispatch(changeTheme("dark"))
        }
    }
    

    return (
        <div className={style.header}>
            <Link to=""><LogoIco color="#1975FF"/></Link>
            
            <div className={style.links}>
                <Link to="profile">
                    <HeaderItem 
                        title="Профиль"
                        preffix={<UserIco/>}
                        isChoosed={location.pathname === "/profile"}
                    />
                </Link>
                <Link to="history">
                    <HeaderItem 
                        title="История"
                        preffix={<TimeIco/>}
                        isChoosed={location.pathname === "/history"}
                    />
                </Link>
                <span style={{flexGrow: "2"}}></span>
                {!isLoggedIn && 
                    <Link to={"login"}>
                        <HeaderItem 
                        title="Войти"
                        preffix={<ExitIco/>}
                        isChoosed={location.pathname === "/login"}
                    />
                    </Link>
                }
                {isLoggedIn && 
                    <HeaderItem 
                        title="Выйти"
                        preffix={<ExitIco/>}
                        style={{
                            color: ""
                        }}
                    />
                }
            </div>
            
            <div onClick={() => {togleTheme()}} className={style.toggler}>
                {curTheme=="dark" &&
                    <ThemeToLightIco color="white"/>
                }
                {curTheme=="light" &&
                    <ThemeToDarkIco color="#97A1AF"/>
                }
            </div>
        </div>
    );
}