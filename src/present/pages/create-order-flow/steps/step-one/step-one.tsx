import { useEffect, useState } from "react";
import { useAxios } from "../../../../../domain/hooks/my-axios";
import { Card } from "../../../../common/card/card";
import type StepProps from "../step-props";
import type DeliverOption from "../../../../../data/models/deliver-option";
import type CalcDeliverOptions from "../../../../../data/dto/responses/calc-deliver-options";
import { orders } from "../../../../../domain/api-path";
import { useMySelector } from "../../../../../domain/hooks/my-selectior";
import { DeliverOptionCard } from "./option-card";
import { useNavigate } from "react-router";
import { useMyDispatch } from "../../../../../domain/hooks/my-dispatch";
import { stepOne } from "../../../../../domain/redux/slices/create-order-flow";

import css from './step-one.module.css'

import ad_img from '../../../../../assets/home_ad_box.png'

export const StepOnePage: React.FC<StepProps> = (props) => {

    const axios = useAxios();

    const [data, setData] = useState<DeliverOption[]>();

    const dispatch = useMyDispatch();

    const navigate = useNavigate();

    const handleSelect = (item: DeliverOption) => {
        console.log("step one -> step two", item);
        
        dispatch(stepOne({
            option: item
        }));
        navigate('/order/2');
    }

    const prewStepData = useMySelector(state => {
        let orderData = state.createOrder
        try{
            return {
                package: {
                    length: orderData.package!.length,
                    width: orderData.package!.width,
                    weight: orderData.package!.weight,
                    height: orderData.package!.height
                },
                senderPoint: {
                    latitude: orderData.senderPoint!.latitude,
                    longitude: orderData.senderPoint!.longitude
                },
                receiverPoint: {
                    latitude: orderData.receiverPoint!.latitude,
                    longitude: orderData.receiverPoint!.longitude
                },
            }
        }
        catch{
            return undefined;
        }
    })

    useEffect(() => {
        if (prewStepData){
            axios.post<CalcDeliverOptions>(orders.calcDeliverOption, prewStepData).then(response => {
                if(response.data.success){
                    setData(response.data.options);
                }
                //TODO: success false
            })
        }
    }, [])

    return (
        <div style={{display: "flex", flexDirection: "column", width: "100%", justifyItems: "stretch", gap: 24}}>
            {data && data.map((el) => {
                return (
                    <DeliverOptionCard option={el} onClick={handleSelect} key={`${el.id}`}/>
                )
            })}
            <div className={css.ad}>
                <div style={{display: "flex", flexDirection: "column", gap: 4, margin: 16}}>
                    <span style={{fontSize: 24, lineHeight: "32px", fontWeight: "700"}}>1+1=3</span>
                    <span style={{fontSize: 14, lineHeight: "20px", color: "rgba(255, 255, 255, 0.6)"}}>3-я доставка в подарок!</span>
                </div>
                <img src={ad_img} style={{width: "136px", height: "107px", transform: ""}}/>
            </div>
        </div>
    )
}