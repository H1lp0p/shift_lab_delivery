import { Card } from "../../common/card/card";
import { UserIco } from "../../icons";

import css from './home.module.css'

export const HomePage: React.FC = () => {
    return (
        <div className={css.page}>
            <Card style={{padding: "16px"}}>
                <span>TESTTESTTEST</span>
                <UserIco></UserIco>  
            </Card>
        </div>
    );
}