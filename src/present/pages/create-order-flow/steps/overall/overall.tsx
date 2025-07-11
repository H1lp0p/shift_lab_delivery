import { useNavigate } from "react-router";
import { useAxios } from "../../../../../domain/hooks/my-axios";
import { useMySelector } from "../../../../../domain/hooks/my-selectior"
import { NavButtons } from "../navigation-buttons/navigation-buttons";

import css from './overall.module.css'
import { EditIco } from "../../../../icons";
import type { Order } from "../../../../../data/dto/responses/new-order";
import type NewOrderResponse from "../../../../../data/dto/responses/new-order";
import { orders } from "../../../../../domain/api-path";
import type CreateOrder from "../../../../../data/dto/requests/orders/create-order";

export const Review: React.FC<{setData: (item: Order) => void}> = ({setData}) => {
    
    const data = useMySelector(state => state.createOrder)

    console.log(data);
    
    
    const axios = useAxios();

    const onSubmit = () => {

        try{
            const resData: CreateOrder = {
            packageId: data.package?.id!,
            optionType: data.deliverOption?.type!,
            senderPointId: data.senderPoint?.id!,
            senderAddress: data.senderAddress!,
            sender: data.sender!,
            receiverPointId: data.receiverPoint?.id!,
            receiverAddress: data.receiverAddress!,
            receiver: data.receiver!,
            payer: data.payer!
            }

            axios.post<NewOrderResponse>(orders.create, resData).then(response => {
                if (response.data.success){
                    setData(response.data.order)
                }
                console.log(response.data.order);
            })
        }
        catch (error){
            console.error(error);
            
        }
    }

    return (
        <div style={{paddingBottom: 32}}>
            <div>
                {/* data items */}
                <div style={{display: "flex", flexDirection: "column", gap: 24, marginBottom: 24}}>
                    <div className={css.card}>
                        <span className={css.title}>Получатель</span>
                        <div className={css.item}>
                            <span className={css.subText}>ФИО</span>
                            <span className={css.data}>
                                {`${data.receiver?.firstname} ${data.receiver?.lastname} ${data.receiver?.middlename}`}
                            </span>
                        </div>
                        <div className={css.item}>
                            <span className={css.subText}>Телефон</span>
                            <span className={css.data}>{data.receiver?.phone}</span>
                        </div>
                        <EditBtn gotoStep={2}/>
                    </div>

                    <div className={css.card}>
                        <span className={css.title}>Отправитель</span>
                        <div className={css.item}>
                            <span className={css.subText}>ФИО</span>
                            <span className={css.data}>
                                {`${data.sender?.firstname} ${data.sender?.lastname} ${data.sender?.middlename}`}
                            </span>
                        </div>
                        <div className={css.item}>
                            <span className={css.subText}>Телефон</span>
                            <span className={css.data}>{data.sender?.phone}</span>
                        </div>
                        <EditBtn gotoStep={3}/>
                    </div>

                    <div className={css.card}>
                        <span className={css.title}>Откуда забрать</span>
                        <div className={css.item}>
                            <span className={css.subText}>Адрес</span>
                            <span className={css.data}>
                                {`ул. ${data.senderAddress?.street}, д. ${data.senderAddress?.house}, кв. ${data.senderAddress?.apartment}`}
                            </span>
                        </div>
                        <div className={css.item}>
                            <span className={css.subText}>Заметка</span>
                            <span className={css.data}>{data.senderAddress?.comment}</span>
                        </div>
                        <EditBtn gotoStep={4}/>
                    </div>

                    <div className={css.card}>
                        <span className={css.title}>Куда доставить</span>
                        <div className={css.item}>
                            <span className={css.subText}>Адрес</span>
                            <span className={css.data}>
                                {`ул. ${data.receiverAddress?.street}, д. ${data.receiverAddress?.house}, кв. ${data.receiverAddress?.apartment}`}
                            </span>
                        </div>
                        <div className={css.item}>
                            <span className={css.subText}>Заметка</span>
                            <span className={css.data}>{data.receiverAddress?.comment}</span>
                        </div>
                        <EditBtn gotoStep={6}/>
                    </div>
                </div>

                {/* price */}
                <div style={{display: "flex", flexDirection: "column", justifyContent: "end"}}>
                    <span style={{textAlign: "end", fontSize: 20, lineHeight: "24px", fontWeight: 600, marginBottom: 16}}>Итого: {data.deliverOption?.price! / 100}₽</span>
                    <span style={{textAlign: "end", fontSize: 16, lineHeight: "24px", fontWeight: 400, marginBottom: 4}}>Тариф: {data.deliverOption?.name}</span>
                    <span style={{textAlign: "end", fontSize: 16, lineHeight: "24px", fontWeight: 400, marginBottom: 36}}>Срок: {data.deliverOption?.days} рабочих дня</span>
                </div>
            </div>


            <NavButtons curPage={7} max={8} onSubmit={onSubmit}/>
        </div>
    );
}

const EditBtn: React.FC<{gotoStep: number}> = ({gotoStep}) => {
    
    const navigate = useNavigate();
    
    return (
        <span onClick={() => navigate(`/order/${gotoStep}`)} style={{display: "flex", alignItems: 'center'}}>
            <EditIco/>
        </span>
    )
}

