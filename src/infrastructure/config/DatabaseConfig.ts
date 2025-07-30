import { VehicleRepository } from '../../domain/VehicleRepository';
import { PostgreSQLVehicleRepository } from '../repositories/PostgreSQLVehicleRepository';

export class DatabaseConfig {
  static getRepository(): VehicleRepository {
    console.log('Using PostgreSQL database');
    return new PostgreSQLVehicleRepository();
  }
} 