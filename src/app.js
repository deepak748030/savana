import express from 'express';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger/swaggerConfig.js';
import productRoutes from './routes/product.routes.js';
import categoryRoutes from './routes/category.routes.js';
import OrderRoutes from './routes/order.routes.js';
import UserRoutes from './routes/user.routes.js';
import ProductVariantRoutes from './routes/productVariant.route.js';
import PosterRoutes from './routes/poster.routes.js';
import commentRoutes from './routes/comment.routes.js';

const app = express();

// Required for __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Static folder to expose /uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use(morgan('dev')); // Logging middleware
app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/product-orders', OrderRoutes);
app.use('/api/users', UserRoutes);
app.use('/api/product-variants', ProductVariantRoutes);
app.use('/api/posters', PosterRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
