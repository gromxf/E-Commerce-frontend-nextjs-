export interface PaymentInfo {
    firstName: string
    lastName: string
    email: string
    address: string
    city: string
    zipCode: string
    cardNumber?: string
    expiryDate?: string
    cvv?: string
    paymentMethod?: string
}

export interface PaymentResponse {
    success: boolean
    message: string
    paymentInfo: {
        firstName: string
        lastName: string
        email: string
        address: string
        city: string
        zipCode: string
        paymentMethod: string
        cardNumber: string | null
    }
    timestamp: string
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"

export async function processPaymentInfo(paymentInfo: PaymentInfo): Promise<PaymentResponse> {
    const res = await fetch(`${API_BASE_URL}/orders/payment-info`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentInfo),
    })
    if (!res.ok) throw new Error("Failed to process payment information")
    const data: PaymentResponse = await res.json()
    return data
}
