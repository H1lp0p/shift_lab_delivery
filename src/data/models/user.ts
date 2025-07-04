import type { Nullable } from "./common";

export default interface User{
    phone: string,
    firstname?: Nullable<string>,
    middlename?: Nullable<string>,
    lastname?: Nullable<string>,
    email?: Nullable<string>,
    city?: Nullable<string>
}