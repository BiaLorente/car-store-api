import { Vehicle, VehicleStatus, PaymentStatus } from '../domain/Vehicle';
import { VehicleRepository } from '../domain/VehicleRepository';
import { v4 as uuidv4 } from 'uuid';

export interface CreateVehicleDTO {
  brand: string;
  model: string;
  year: number;
  color: string;
  price: number;
}

export class CreateVehicle {
  constructor(private vehicleRepo: VehicleRepository) {}

  async execute(data: CreateVehicleDTO): Promise<Vehicle> {
    const vehicle = new Vehicle(
      uuidv4(),
      data.brand,
      data.model,
      data.year,
      data.color,
      data.price,
      'for_sale',
      null,
      null,
      'pending',
      null
    );
    await this.vehicleRepo.create(vehicle);
    return vehicle;
  }
} 