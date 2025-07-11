import { data, useNavigate, useParams } from "react-router"
import type BaseProps from "../../common/base-props";

import css from './flow-layout.module.css'
import { StepOnePage } from "./steps/step-one/step-one";
import { StepTwoPage } from "./steps/step-two/step-two";
import { StepThreePage } from "./steps/step-three/step-three";
import { StepFourPage } from "./steps/step-four/step-four";
import { StepFivePage } from "./steps/step-five/step-five";
import { StepSixPage } from "./steps/step-six/step-six";
import { Review } from "./steps/overall/overall";
import { useState } from "react";
import type { Order } from "../../../data/dto/responses/new-order";

import accept_img from '../../../assets/Accept.png'
import { CompletePage } from "./steps/complete/complete";

const titles = [
    "Способ отправки",
    "Получатель",
    "Отправитель",
    "Откуда забрать",
    "Куда доставить",
    "Оплата доставки",
    "проверка данных",
    "Заявка отправлена"
]

const maxStep = 8

export const FlowLayout : React.FC = () => {

    const params = useParams();

    const {flowStep} = params;

    const step = parseInt(flowStep!)

    const curTitle = titles[step - 1]

    const [completeOrder, setOrder] = useState<Order>();

    return (
        <div className={css.layout} style={step == 7 || step == 8 ? {width: "960px"} : undefined}>
            <div className={css.hat}>
                <div style={{display: "flex", flexDirection: "row", gap: 36,  marginBottom: 24}}>
                    {step == 8 && <img src={accept_img} style={{width: "56px", height: 56}}/>}
                    <span className={css.layoutTitle}>{curTitle}</span>
                </div>
                {step == 8 && <span style={{fontSize: 18, lineHeight: "24px", fontWeight: 400}}>Вы можете оплатить ваш заказ в разделе «Профиль»</span>}
                {step != 8 && <span className={css.stepCount}>{`Шаг ${step} из 7`}</span>}
                {step != 8 && <span className={css.progress}>
                    <span className={css.progressTrack} style={{flexGrow: step}}></span>
                    <span style={{flexGrow: maxStep - step}}></span>
                </span>}
            </div>
            {/* form pages */}
            <div>
                {step == 1 && <StepOnePage/>}
                {step == 2 && <StepTwoPage/>}
                {step == 3 && <StepThreePage/>}
                {step == 4 && <StepFourPage/>}
                {step == 5 && <StepFivePage/>}
                {step == 6 && <StepSixPage/>}
                {step == 7 && <Review setData={(item) => setOrder(item)}/>}
                {step == 8 && <CompletePage order={completeOrder!} />}
            </div>
        </div>
    )
}