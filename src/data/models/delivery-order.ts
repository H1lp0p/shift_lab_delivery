import type CreateDeliveryOrderAdress from "../dto/requests/orders/create-delivery-order-adress";
import type CreateDeliveryOrderReceiverAdress from "../dto/requests/orders/create-delivery-order-receiver-adress";
import type CreatePaymentPerson from "../dto/requests/orders/create-payment-person";
import type Package from "./package";
import type PickupPoint from "./pickup-point";
import type { DeliverStatus, DeliveryType, Payer } from "./types";

export default interface DeliverOrder{
    price: number,
    package: Package,
    option: DeliveryType,
    
    senderPoint: PickupPoint,
    senderAdress: CreateDeliveryOrderAdress,
    sender: CreatePaymentPerson,

    receiverPoint: PickupPoint,
    receiverAdress: CreateDeliveryOrderReceiverAdress,
    receiver: CreatePaymentPerson,

    payer: Payer,

    status: DeliverStatus,
    cancellable: boolean
}