import { VehicleRepository } from '../domain/VehicleRepository';
import { Vehicle } from '../domain/Vehicle';

export class ListVehiclesForSale {
  constructor(private vehicleRepo: VehicleRepository) {}

  async execute(): Promise<Vehicle[]> {
    return this.vehicleRepo.listForSale();
  }
} 