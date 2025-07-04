import type CalcDeliverPackage from "./calc-deliver-package-dto";
import type CalcDeliverPoint from "./calc-deliver-point";

export default interface CalcDeliverPrice{
    package: CalcDeliverPackage,
    senderPoint: CalcDeliverPoint,
    receiverPoint: CalcDeliverPoint
}