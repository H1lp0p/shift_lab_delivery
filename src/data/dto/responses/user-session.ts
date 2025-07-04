import type User from "../../models/user";
import type BaseResponse from "./base-response";

export default interface UserSession extends BaseResponse{
    user: User,
}