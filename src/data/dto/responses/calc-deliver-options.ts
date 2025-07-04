import type DeliverOption from "../../models/deliver-option";
import type BaseResponse from "./base-response";

export default interface CalcDeliverOptions extends BaseResponse{
    options: DeliverOption[]
}