import type { DeliveryType } from "./types";

export default interface DeliverOption{
    id: string,
    price: number,
    days: number,
    name: string,
    type: DeliveryType
}