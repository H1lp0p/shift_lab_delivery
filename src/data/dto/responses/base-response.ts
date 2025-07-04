
/**
* Base response interface. To create new response interface, you need it to extend this one.
*/
export default interface BaseResponse{
    success: boolean,
    reason: string,
}