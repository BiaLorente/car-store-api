import { VehicleRepository } from '../domain/VehicleRepository';
import { PaymentStatus, Vehicle } from '../domain/Vehicle';

export interface UpdatePaymentStatusDTO {
  paymentCode: string;
  status: PaymentStatus;
}

export class UpdatePaymentStatus {
  constructor(private vehicleRepo: VehicleRepository) {}

  async execute(data: UpdatePaymentStatusDTO): Promise<Vehicle> {
    const vehicle = await this.vehicleRepo.findByPaymentCode(data.paymentCode);
    if (!vehicle) throw new Error('Vehicle not found for payment code');
    vehicle.paymentStatus = data.status;
    await this.vehicleRepo.update(vehicle);
    return vehicle;
  }
} 