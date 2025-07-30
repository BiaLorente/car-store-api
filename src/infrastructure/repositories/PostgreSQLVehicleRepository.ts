import { Vehicle, VehicleStatus, PaymentStatus } from '../../domain/Vehicle';
import { VehicleRepository } from '../../domain/VehicleRepository';
import { Pool } from 'pg';

export class PostgreSQLVehicleRepository implements VehicleRepository {
  private pool: Pool;

  constructor() {
    // Use DATABASE_URL if provided, otherwise use individual parameters
    if (process.env.DATABASE_URL) {
      this.pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
      });
    } else {
      this.pool = new Pool({
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432'),
        database: process.env.DB_NAME || 'carstore',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'password',
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
      });
    }

    this.initializeTable();
  }

  private async initializeTable(): Promise<void> {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS vehicles (
        id UUID PRIMARY KEY,
        brand VARCHAR(100) NOT NULL,
        model VARCHAR(100) NOT NULL,
        year INTEGER NOT NULL,
        color VARCHAR(50) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        status VARCHAR(20) DEFAULT 'for_sale',
        buyer_cpf VARCHAR(14),
        sale_date TIMESTAMP,
        payment_status VARCHAR(20) DEFAULT 'pending',
        payment_code VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    try {
      await this.pool.query(createTableQuery);
      console.log('Vehicles table initialized');
    } catch (error) {
      console.error('Error initializing vehicles table:', error);
    }
  }

  async create(vehicle: Vehicle): Promise<void> {
    const query = `
      INSERT INTO vehicles (
        id, brand, model, year, color, price, status, 
        buyer_cpf, sale_date, payment_status, payment_code
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    `;

    const values = [
      vehicle.id,
      vehicle.brand,
      vehicle.model,
      vehicle.year,
      vehicle.color,
      vehicle.price,
      vehicle.status,
      vehicle.buyerCpf,
      vehicle.saleDate,
      vehicle.paymentStatus,
      vehicle.paymentCode,
    ];

    await this.pool.query(query, values);
  }

  async update(vehicle: Vehicle): Promise<void> {
    const query = `
      UPDATE vehicles SET 
        brand = $2, model = $3, year = $4, color = $5, price = $6,
        status = $7, buyer_cpf = $8, sale_date = $9, 
        payment_status = $10, payment_code = $11, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
    `;

    const values = [
      vehicle.id,
      vehicle.brand,
      vehicle.model,
      vehicle.year,
      vehicle.color,
      vehicle.price,
      vehicle.status,
      vehicle.buyerCpf,
      vehicle.saleDate,
      vehicle.paymentStatus,
      vehicle.paymentCode,
    ];

    await this.pool.query(query, values);
  }

  async findById(id: string): Promise<Vehicle | null> {
    const query = 'SELECT * FROM vehicles WHERE id = $1';
    const result = await this.pool.query(query, [id]);

    if (result.rows.length === 0) {
      return null;
    }

    return this.mapRowToVehicle(result.rows[0]);
  }

  async listForSale(): Promise<Vehicle[]> {
    const query = 'SELECT * FROM vehicles WHERE status = $1 ORDER BY price ASC';
    const result = await this.pool.query(query, ['for_sale']);
    return result.rows.map((row: any) => this.mapRowToVehicle(row));
  }

  async listSold(): Promise<Vehicle[]> {
    const query = 'SELECT * FROM vehicles WHERE status = $1 ORDER BY price ASC';
    const result = await this.pool.query(query, ['sold']);
    return result.rows.map((row: any) => this.mapRowToVehicle(row));
  }

  async findByPaymentCode(paymentCode: string): Promise<Vehicle | null> {
    const query = 'SELECT * FROM vehicles WHERE payment_code = $1';
    const result = await this.pool.query(query, [paymentCode]);

    if (result.rows.length === 0) {
      return null;
    }

    return this.mapRowToVehicle(result.rows[0]);
  }

  private mapRowToVehicle(row: any): Vehicle {
    return new Vehicle(
      row.id,
      row.brand,
      row.model,
      row.year,
      row.color,
      parseFloat(row.price),
      row.status as VehicleStatus,
      row.buyer_cpf,
      row.sale_date ? new Date(row.sale_date) : null,
      row.payment_status as PaymentStatus,
      row.payment_code
    );
  }

  async close(): Promise<void> {
    await this.pool.end();
  }
} 