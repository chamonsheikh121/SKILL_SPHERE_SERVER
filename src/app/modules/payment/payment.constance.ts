import { TPaymentMethods, TPaymentStatus } from "./payment.interface"

export const payment_status_const:TPaymentStatus[] = ["success", "failed", "pending"]
export const payment_methods_const:TPaymentMethods[] = ["ssl_commerz", "stripe", "surjopay"]