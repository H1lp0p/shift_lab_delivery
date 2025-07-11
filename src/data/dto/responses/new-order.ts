import type Package from "../../models/package";
import type PickupPoint from "../../models/pickup-point";
import type CreateDeliveryOrderAdress from "../requests/orders/create-delivery-order-adress";
import type CreateDeliveryOrderReceiverAdress from "../requests/orders/create-delivery-order-receiver-adress";
import type CreatePaymentPerson from "../requests/orders/create-payment-person";
import type BaseResponse from "./base-response";

export interface Order {
  price: number;
  package: Package;
  option: "DEFAULT" | "EXPRESS";
  senderPoint: PickupPoint;
  senderAddress: CreateDeliveryOrderAdress;
  sender: CreatePaymentPerson;
  receiverPoint: PickupPoint;
  receiverAddress: CreateDeliveryOrderReceiverAdress;
  receiver: CreatePaymentPerson;
  payer: "RECEIVER" | "SENDER";
  status: 0 | 1 | 2 | 3 | 4;
  cancellable: boolean;
}

export default interface NewOrderResponse extends BaseResponse{
    order: Order;
}
