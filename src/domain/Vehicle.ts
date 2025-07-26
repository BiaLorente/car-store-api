export type VehicleStatus = 'for_sale' | 'sold';
export type PaymentStatus = 'pending' | 'paid' | 'cancelled';

export class Vehicle {
  constructor(
    public id: string,
    public brand: string,
    public model: string,
    public year: number,
    public color: string,
    public price: number,
    public status: VehicleStatus = 'for_sale',
    public buyerCpf: string | null = null,
    public saleDate: Date | null = null,
    public paymentStatus: PaymentStatus = 'pending',
    public paymentCode: string | null = null
  ) {}
} 