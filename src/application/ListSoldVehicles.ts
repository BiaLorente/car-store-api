import { VehicleRepository } from '../domain/VehicleRepository';
import { Vehicle } from '../domain/Vehicle';

export class ListSoldVehicles {
  constructor(private vehicleRepo: VehicleRepository) {}

  async execute(): Promise<Vehicle[]> {
    return this.vehicleRepo.listSold();
  }
} 