import express from 'express';
import cors from 'cors';
import vehicleRoutes from './routes/vehicleRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', vehicleRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app; 