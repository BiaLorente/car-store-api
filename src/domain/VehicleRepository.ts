import { Vehicle } from './Vehicle';

export interface VehicleRepository {
  create(vehicle: Vehicle): Promise<void>;
  update(vehicle: Vehicle): Promise<void>;
  findById(id: string): Promise<Vehicle | null>;
  listForSale(): Promise<Vehicle[]>;
  listSold(): Promise<Vehicle[]>;
  findByPaymentCode(paymentCode: string): Promise<Vehicle | null>;
} 