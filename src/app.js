import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger/swaggerConfig.js';
import productRoutes from './routes/product.routes.js';
import categoryRoutes from './routes/category.routes.js';

const app = express();

// Required for __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Static folder to expose /uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use(cors());
app.use(express.json());
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
