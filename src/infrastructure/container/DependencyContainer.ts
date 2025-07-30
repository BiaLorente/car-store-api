import { VehicleRepository } from '../../domain/VehicleRepository';
import { DatabaseConfig } from '../config/DatabaseConfig';
import { CreateVehicle } from '../../application/CreateVehicle';
import { EditVehicle } from '../../application/EditVehicle';
import { SellVehicle } from '../../application/SellVehicle';
import { ListVehiclesForSale } from '../../application/ListVehiclesForSale';
import { ListSoldVehicles } from '../../application/ListSoldVehicles';
import { UpdatePaymentStatus } from '../../application/UpdatePaymentStatus';
import { VehicleController } from '../../interfaces/controllers/VehicleController';
import { PaymentGateway } from '../../domain/PaymentGateway';
import { MockPaymentGateway } from '../gateways/MockPaymentGateway';

export class DependencyContainer {
  private static instance: DependencyContainer;
  private vehicleRepository!: VehicleRepository;
  private createVehicle!: CreateVehicle;
  private editVehicle!: EditVehicle;
  private sellVehicle!: SellVehicle;
  private listVehiclesForSale!: ListVehiclesForSale;
  private listSoldVehicles!: ListSoldVehicles;
  private updatePaymentStatus!: UpdatePaymentStatus;
  private vehicleController!: VehicleController;
  private paymentGateway!: PaymentGateway;

  private constructor() {
    this.initializeDependencies();
  }

  public static getInstance(): DependencyContainer {
    if (!DependencyContainer.instance) {
      DependencyContainer.instance = new DependencyContainer();
    }
    return DependencyContainer.instance;
  }

  private initializeDependencies(): void {
    this.vehicleRepository = DatabaseConfig.getRepository();
    this.paymentGateway = new MockPaymentGateway();

    this.createVehicle = new CreateVehicle(this.vehicleRepository);
    this.editVehicle = new EditVehicle(this.vehicleRepository);
    this.sellVehicle = new SellVehicle(this.vehicleRepository);
    this.listVehiclesForSale = new ListVehiclesForSale(this.vehicleRepository);
    this.listSoldVehicles = new ListSoldVehicles(this.vehicleRepository);
    this.updatePaymentStatus = new UpdatePaymentStatus(this.vehicleRepository);

    this.vehicleController = new VehicleController(
      this.createVehicle,
      this.editVehicle,
      this.sellVehicle,
      this.listVehiclesForSale,
      this.listSoldVehicles,
      this.updatePaymentStatus
    );
  }

  public getVehicleController(): VehicleController {
    return this.vehicleController;
  }

  public getVehicleRepository(): VehicleRepository {
    return this.vehicleRepository;
  }

  public getPaymentGateway(): PaymentGateway {
    return this.paymentGateway;
  }
} 