import { data, useNavigate } from "react-router";
import type { Order } from "../../../../../data/dto/responses/new-order";
import { Card } from "../../../../common/card/card";

import css from './complete.module.css'
import { Button } from "../../../../common/button/button";

const mock: Order = {
  price: 1500,
  package: {
    id: "envelope",
    name: "Конверт",
    length: 30,
    width: 20,
    weight: 0.5,
    height: 2,
  },
  option: "DEFAULT",
  senderPoint: {
    id: "1",
    name: "Москва",
    latitude: 55.7558,
    longitude: 37.6173,
  },
  senderAddress: {
    street: "Тверская",
    house: "12",
    apartment: "34",
    comment: "Подъезд 3, этаж 2",
  },
  sender: {
    firstname: "Иван",
    lastname: "Иванов",
    middlename: "Иванович",
    phone: "89990009999",
  },
  receiverPoint: {
    id: "2",
    name: "Санкт-Петербург",
    latitude: 59.9343,
    longitude: 30.3351,
  },
  receiverAddress: {
    street: "Невский проспект",
    house: "45",
    apartment: "12",
    comment: "Код домофона 1234",
    isNonContact: true,
  },
  receiver: {
    firstname: "Пётр",
    lastname: "Петров",
    middlename: "Петрович",
    phone: "89991112233",
  },
  payer: "SENDER",
  status: 1,
  cancellable: true,
};


export const CompletePage: React.FC<{order?: Order}> = ({order}) => {

    const ord = order || mock

    const navigate = useNavigate();

    return (
        <div style={{width: "600px", display: 'flex', flexDirection: 'column', justifyItems: "stretch"}}>
             <Card variant="outlined" style={{display: "flex", flexDirection: "column", flexGrow: 1, width: "100%", padding: "24px 48px", gap: 24, marginTop: 24}}>
            <div className={css.item}>
                <span className={css.subTitle}>Нормер заказа</span>
                <span className={css.data}>...none?</span>
            </div>

            <div className={css.item}>
                <span className={css.subTitle}>Статус</span>
                <Status status={ord.status}/>
            </div>

            <div className={css.item}>
                <span className={css.subTitle}>Адрес доставки</span>
                <span className={css.data}>Россия, г. {ord.receiverPoint.name}, ул. {ord.receiverAddress.street}, д. {ord.receiverAddress.house}</span>
            </div>

            <div className={css.item}>
                <span className={css.subTitle}>Тип доставки</span>
                <span className={css.data}>{ord.option == "EXPRESS" ? "Экспресс доставкиа" : "Обычная доставка"}</span>
            </div>

            <span style={{color: "#97A1AF", fontSize: 14, lineHeight: "20px", fontWeight: 400}}>Вся информация была продублирована в SMS</span>

            </Card>

            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 24, justifySelf: "stretch", flexGrow: 1, width: '464px', marginTop: 40}}>
                <Button variant="outlined" label="Посмотреть статус" style={{flexGrow: 1}}/>
                <Button label="На главную" onClick={() => navigate("")} style={{flexGrow: 1}}/>
            </div>
        </div>

    );
}

const Status: React.FC<{status: 0 | 1 | 2 | 3 | 4}> = ({status}) => {
    const statusStr = [
        "Создан",
        "Ждём курьера",
        "Везём заказ",
        "Доставлен",
        "Отменён"
    ]

    const colors = [
        "#ffb219",
        "#ffb219",
        "#ffb219",
        "#40bf7f",
        "#f64c4c"
    ]
    
    return(
        <div style={{display: "flex", flexDirection: "row", alignItems: 'center', gap: 12}}>
            <span style={{backgroundColor: colors[status], width: 8, height: 8, borderRadius: "50%"}}/>
            <span className={css.data}>{statusStr[status]}</span>
        </div>
    )
}