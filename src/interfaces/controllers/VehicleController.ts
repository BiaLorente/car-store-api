import { Request, Response } from 'express';
import { CreateVehicle } from '../../application/CreateVehicle';
import { EditVehicle } from '../../application/EditVehicle';
import { SellVehicle } from '../../application/SellVehicle';
import { ListVehiclesForSale } from '../../application/ListVehiclesForSale';
import { ListSoldVehicles } from '../../application/ListSoldVehicles';
import { UpdatePaymentStatus } from '../../application/UpdatePaymentStatus';

export class VehicleController {
  constructor(
    private createVehicle: CreateVehicle,
    private editVehicle: EditVehicle,
    private sellVehicle: SellVehicle,
    private listVehiclesForSale: ListVehiclesForSale,
    private listSoldVehicles: ListSoldVehicles,
    private updatePaymentStatus: UpdatePaymentStatus
  ) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const vehicle = await this.createVehicle.execute(req.body);
      res.status(201).json(vehicle);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async edit(req: Request, res: Response): Promise<void> {
    try {
      const vehicle = await this.editVehicle.execute({ 
        id: req.params.id, 
        ...req.body 
      });
      res.json(vehicle);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async sell(req: Request, res: Response): Promise<void> {
    try {
      const { buyerCpf, saleDate, paymentCode } = req.body;
      const vehicle = await this.sellVehicle.execute({
        id: req.params.id,
        buyerCpf,
        saleDate: new Date(saleDate),
        paymentCode,
      });
      res.json(vehicle);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async listForSale(req: Request, res: Response): Promise<void> {
    try {
      const vehicles = await this.listVehiclesForSale.execute();
      res.json(vehicles);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async listSold(req: Request, res: Response): Promise<void> {
    try {
      const vehicles = await this.listSoldVehicles.execute();
      res.json(vehicles);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async handlePaymentStatusUpdate(req: Request, res: Response): Promise<void> {
    try {
      const { paymentCode, status } = req.body;
      const vehicle = await this.updatePaymentStatus.execute({ 
        paymentCode, 
        status 
      });
      res.json(vehicle);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
} 