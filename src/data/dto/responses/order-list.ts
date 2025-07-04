import type DeliverOrder from "../../models/delivery-order";
import type BaseResponse from "./base-response";

export default interface DeliverOrderList extends BaseResponse{
    orders: DeliverOrder[],
}