import { Router } from 'express';
import { DependencyContainer } from '../../infrastructure/container/DependencyContainer';

const router = Router();
const container = DependencyContainer.getInstance();
const vehicleController = container.getVehicleController();

router.post('/vehicles', (req, res) => vehicleController.create(req, res));

router.put('/vehicles/:id', (req, res) => vehicleController.edit(req, res));

router.post('/vehicles/:id/sell', (req, res) => vehicleController.sell(req, res));

router.get('/vehicles/for-sale', (req, res) => vehicleController.listForSale(req, res));

router.get('/vehicles/sold', (req, res) => vehicleController.listSold(req, res));

router.post('/webhook/payment-status', (req, res) => vehicleController.handlePaymentStatusUpdate(req, res));

router.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

export default router; 