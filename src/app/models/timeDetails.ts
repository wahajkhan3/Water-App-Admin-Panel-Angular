export interface TimeDetails {
    name: String;
    date: String;
    status: String;
    timeInOut: TimeInOut[]
}
interface TimeInOut {
    id: number,
    userId: number,
    checkIn: Date,
    checkOut: Date,
    isBreakIn: any,
    late: String
}