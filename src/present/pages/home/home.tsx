import { Card } from "../../common/card/card";
import { BoxOpenIco, UserIco } from "../../icons";

import qr_img from '../../../assets/QR_koronapay.png'
import box_img from '../../../assets/home_box.png'

import css from './home.module.css'
import { Input } from "../../common/input/input";
import { useState } from "react";
import { PickupPointSelect } from "../../common/pickup-option-input/pickup-option-input";
import { homePage } from "../../../domain/api-path";
import type PickupPoint from "../../../data/models/pickup-point";
import { PackageOptionInput } from "../../common/package-option-input/package-option-input";
import { Button } from "../../common/button/button";
import type Package from "../../../data/models/package";

export const HomePage: React.FC = () => {

    const [fromPoint, setFromPoint] = useState<PickupPoint>();
    const [toPoint, setToPoint] = useState<PickupPoint>();
    const [packageItem, setPackage] = useState<Package>();

    const [deliverId, setId] = useState<string>();

    const handleSend = () => {
        console.log(fromPoint, toPoint, packageItem);
    }

    return (
        <div className={css.page}>
            <div className={css.content}>
                {/* title + box + qr-code */}
                <div style={{display: "flex", flexDirection: "row", alignItems: "center", width: "100%", justifyContent: "space-between"}}>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <h1 style={{fontFamily: "Inter", fontWeight: "700", marginBottom: "16px"}}>Мы доставим ваш заказ</h1>
                        <span style={{color: "#CED2DA", fontWeight: "300", fontStyle: "light"}}>Отправляйте посылки в приложении Шифт Delivery</span>
                        <Card style={{display: "flex", flexDirection: "row", alignItems: "center", padding: "16px", width: "400px", marginTop: "40px"}}>
                            <BoxOpenIco/>
                            <img className={css.qr} src={qr_img} style={{width: "64px", marginLeft: "16px"}}></img>
                            <div style={{display: "flex", flexDirection: "column", marginLeft: "16px", color: "#CED2DA"}}>
                                <span>Наведите камеру телефона</span>
                                <span>на QR-код</span>
                            </div>
                        </Card>
                    </div>

                    <img src={box_img} style={{transform: "translateX(25%)"}}></img>
                </div>
                {/* Calculate delivery */}
                <Card style={{width: "928px", display: "flex", flexDirection: "column", padding: '16px'}}>
                    <span className={css.cardTitle}>Расчитать доставку</span>
                    <div style={{display: 'flex', flexDirection: "row"}}>
                        <PickupPointSelect onOptChange={(element) => setFromPoint(element)} type="from"/>
                        <PickupPointSelect onOptChange={(element) => setToPoint(element)} type="to"/>
                        <PackageOptionInput onChange={(item) => setPackage(item)}/>
                    </div>
                    <div style={{display: "flex", flexDirection: "row-reverse", padding: 16}}>
                        <Button label="Расчитать" variant="filled" style={{width: "200px"}} onClick={() => handleSend()}></Button>
                    </div>
                </Card>
                {/* Track delivery + ad */}
                <div style={{display: 'flex', flexDirection: "row"}}>
                    <Card style={{padding: 16, margin: 32}}>
                        <span className={css.cardTitle}>Отследить посылку</span>
                        <Input placeholder="номер заказа" type={"text"} onChange={(e) => setId(e.target.value)}/>
                        <Button onClick={() => alert(`id is ${deliverId}`)}/>
                    </Card>
                    <div style={{flexGrow: 2}}>
                        <span>test</span>
                    </div>
                </div>
            </div>
        </div>
    );
}