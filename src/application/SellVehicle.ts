import { VehicleRepository } from '../domain/VehicleRepository';
import { Vehicle } from '../domain/Vehicle';

export interface SellVehicleDTO {
  id: string;
  buyerCpf: string;
  saleDate: Date;
  paymentCode: string;
}

export class SellVehicle {
  constructor(private vehicleRepo: VehicleRepository) {}

  async execute(data: SellVehicleDTO): Promise<Vehicle> {
    const vehicle = await this.vehicleRepo.findById(data.id);
    if (!vehicle) throw new Error('Vehicle not found');
    if (vehicle.status === 'sold') throw new Error('Vehicle already sold');
    vehicle.status = 'sold';
    vehicle.buyerCpf = data.buyerCpf;
    vehicle.saleDate = data.saleDate;
    vehicle.paymentCode = data.paymentCode;
    vehicle.paymentStatus = 'pending';
    await this.vehicleRepo.update(vehicle);
    return vehicle;
  }
} 