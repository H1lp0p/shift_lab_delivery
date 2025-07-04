import type User from "../../models/user";
import type BaseResponse from "./base-response";

export default interface AuthorizeResponse extends BaseResponse{
    user: User,
    token: string,
}