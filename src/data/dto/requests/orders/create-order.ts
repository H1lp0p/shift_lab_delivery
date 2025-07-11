import type DeliverOption from "../../../models/deliver-option";
import type { Payer } from "../../../models/types";
import type CreateDeliveryOrderAdress from "./create-delivery-order-adress";
import type CreateDeliveryOrderReceiverAdress from "./create-delivery-order-receiver-adress";
import type CreatePaymentPerson from "./create-payment-person";

export default interface CreateOrder{
    packageId: string,
    optionType: "DEFAULT" | "EXPRESS",

    senderPointId: string,
    senderAddress: CreateDeliveryOrderAdress,
    sender: CreatePaymentPerson,

    receiverPointId: string,
    receiverAddress: CreateDeliveryOrderReceiverAdress,
    receiver: CreatePaymentPerson,

    payer: Payer
}