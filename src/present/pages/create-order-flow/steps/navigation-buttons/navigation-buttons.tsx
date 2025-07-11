import { useNavigate } from "react-router-dom";
import { Button } from "../../../../common/button/button";

export const NavButtons: React.FC<{curPage: number, onSubmit: () => void, max?: number, active?: boolean}> = ({curPage, onSubmit, max = 7, active = true}) => {
    
    const navigate = useNavigate();
    
    const goto = (step: number) => {
        if (step >= 1 && step <= max){
            navigate(`/order/${step}`)
        }
    }

    return (
        <div style={{display: "flex", flexDirection: "row", width: "100%", gap: 24}}>
            <Button 
            variant="outlined" 
            onClick={() => {goto(curPage - 1)}}
            label="Назад"
            style={{flexGrow: 1}}/>
            <Button 
            onClick={() => {onSubmit(); goto(curPage + 1)}}
            label="Продолжить"
            style={{flexGrow: 1}}
            disabled={!active}/>
        </div>
    )
}