import { VehicleRepository } from '../domain/VehicleRepository';
import { Vehicle } from '../domain/Vehicle';

export interface EditVehicleDTO {
  id: string;
  brand?: string;
  model?: string;
  year?: number;
  color?: string;
  price?: number;
}

export class EditVehicle {
  constructor(private vehicleRepo: VehicleRepository) {}

  async execute(data: EditVehicleDTO): Promise<Vehicle> {
    const vehicle = await this.vehicleRepo.findById(data.id);
    if (!vehicle) throw new Error('Vehicle not found');
    if (vehicle.status === 'sold') throw new Error('Cannot edit a sold vehicle');
    if (data.brand) vehicle.brand = data.brand;
    if (data.model) vehicle.model = data.model;
    if (data.year) vehicle.year = data.year;
    if (data.color) vehicle.color = data.color;
    if (data.price) vehicle.price = data.price;
    await this.vehicleRepo.update(vehicle);
    return vehicle;
  }
} 