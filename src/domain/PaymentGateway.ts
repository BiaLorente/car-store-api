export type PaymentStatus = 'pending' | 'paid' | 'cancelled';

export interface PaymentGateway {
  processPayment(paymentCode: string, amount: number): Promise<PaymentStatus>;
  getPaymentStatus(paymentCode: string): Promise<PaymentStatus>;
} 