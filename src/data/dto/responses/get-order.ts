import type DeliverOrder from "../../models/delivery-order";
import type BaseResponse from "./base-response";

export default interface GetOrderDto extends BaseResponse{
    order: DeliverOrder,
}