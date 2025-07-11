import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type CreateDeliveryOrderAdress from "../../../data/dto/requests/orders/create-delivery-order-adress"
import type CreateDeliveryOrderReceiverAdress from "../../../data/dto/requests/orders/create-delivery-order-receiver-adress"
import type CreatePaymentPerson from "../../../data/dto/requests/orders/create-payment-person"
import type Package from "../../../data/models/package"
import type PickupPoint from "../../../data/models/pickup-point"
import type DeliverOption from "../../../data/models/deliver-option"

interface DeliverData{
    package: Package | null,
    senderPoint: PickupPoint | null,
    receiverPoint: PickupPoint | null,
    deliverOption: DeliverOption | null,
    receiver: CreatePaymentPerson | null,
    sender: CreatePaymentPerson | null,
    senderAddress: CreateDeliveryOrderAdress | null,
    receiverAddress: CreateDeliveryOrderReceiverAdress | null,
    payer: "RECEIVER" | "SENDER"
}

export interface StepZero{
    package: Package,
    senderPoint: PickupPoint,
    receiverPoint: PickupPoint,
}

export interface StepOne{
    option: DeliverOption
}

export interface StepTwo{
    receiver: CreatePaymentPerson,
}

export interface StepThree{
    sender: CreatePaymentPerson,
}

export interface StepFour{
    senderAddress: CreateDeliveryOrderAdress,
}

export interface StepFive{
    receiverAddress: CreateDeliveryOrderReceiverAdress,
}

export interface StepSix{
    payer: "RECEIVER" | "SENDER"
}

const initState: DeliverData = {
    package: null,
    senderPoint: null,
    receiverPoint: null,
    deliverOption: null,
    receiver: null,
    sender: null,
    senderAddress: null,
    receiverAddress: null,
    payer: "SENDER"
}

const CreateOrderSlice = createSlice({
    name: "create-order-slice",
    initialState: initState,
    reducers: {
        stepZero(state, action: PayloadAction<StepZero>){
            state.package = action.payload.package
            state.receiverPoint = action.payload.receiverPoint
            state.senderPoint = action.payload.senderPoint
            
        },
        stepOne(state, action: PayloadAction<StepOne>){
            state.deliverOption = action.payload.option
        },
        stepTwo(state, action: PayloadAction<StepTwo>){
            state.receiver = action.payload.receiver
        },
        stepThree(state, action: PayloadAction<StepThree>){
            state.sender = action.payload.sender
        },
        stepFour(state, action: PayloadAction<StepFour>){
            state.senderAddress = action.payload.senderAddress
        },
        stepFive(state, action: PayloadAction<StepFive>){
            state.receiverAddress = action.payload.receiverAddress
        },
        stepSix(state, action: PayloadAction<StepSix>){
            state.payer = action.payload.payer
        },
    },
})

const createOrder = CreateOrderSlice.reducer

export const {stepZero, stepOne, stepTwo, stepThree, stepFour, stepFive, stepSix} = CreateOrderSlice.actions
export default createOrder