import { Vehicle } from '../domain/Vehicle';
import { VehicleRepository } from '../domain/VehicleRepository';

export class InMemoryVehicleRepository implements VehicleRepository {
  private vehicles = new Map<string, Vehicle>();

  async create(vehicle: Vehicle): Promise<void> {
    this.vehicles.set(vehicle.id, vehicle);
  }

  async update(vehicle: Vehicle): Promise<void> {
    this.vehicles.set(vehicle.id, vehicle);
  }

  async findById(id: string): Promise<Vehicle | null> {
    return this.vehicles.get(id) || null;
  }

  async listForSale(): Promise<Vehicle[]> {
    return Array.from(this.vehicles.values())
      .filter(v => v.status === 'for_sale')
      .sort((a, b) => a.price - b.price);
  }

  async listSold(): Promise<Vehicle[]> {
    return Array.from(this.vehicles.values())
      .filter(v => v.status === 'sold')
      .sort((a, b) => a.price - b.price);
  }

  async findByPaymentCode(paymentCode: string): Promise<Vehicle | null> {
    return (
      Array.from(this.vehicles.values()).find(v => v.paymentCode === paymentCode) || null
    );
  }
} 