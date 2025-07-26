import { PaymentGateway, PaymentStatus } from '../../domain/PaymentGateway';

export class MockPaymentGateway implements PaymentGateway {
  private payments = new Map<string, PaymentStatus>();

  async processPayment(paymentCode: string, amount: number): Promise<PaymentStatus> {
    const status: PaymentStatus = Math.random() > 0.5 ? 'paid' : 'pending';
    this.payments.set(paymentCode, status);
    return status;
  }

  async getPaymentStatus(paymentCode: string): Promise<PaymentStatus> {
    return this.payments.get(paymentCode) || 'pending';
  }

  updatePaymentStatus(paymentCode: string, status: PaymentStatus): void {
    this.payments.set(paymentCode, status);
  }
} 