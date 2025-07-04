import type CreateDeliveryOrderAdress from "./create-delivery-order-adress";

export default interface CreateDeliveryOrderReceiverAdress extends CreateDeliveryOrderAdress{
    isNonContact: boolean,
}