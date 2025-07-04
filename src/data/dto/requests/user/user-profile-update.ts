import type { Nullable } from "../../models/common";

export default interface UserProfileUpdate{
    profile: {
        firstname?: Nullable<string>,
        middlename?: Nullable<string>,
        lastname?: Nullable<string>,
        email?: Nullable<string>,
        city?: Nullable<string>
    }
    phone: string,
}