import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

import dashboardRoutes from '../routes/dashboardRoutes.js';
import complaintsRoutes from '../routes/complaintsRoutes.js';
import paymentsRoutes from '../routes/paymentsRoutes.js';
import facilitiesRoutes from '../routes/facilitiesRoutes.js';

// ES Module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Production Security & Performance Middlewares
app.use(helmet({
  contentSecurityPolicy: false, // Prevents breaking inline React scripts unless appropriately configured
}));
app.use(compression());
app.use(morgan('tiny'));

app.use(cors());
app.use(bodyParser.json());

// Main Router Definitions
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/complaints', complaintsRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api/facilities', facilitiesRoutes);

// Serve static assets from the React app build (dist)
app.use(express.static(path.join(__dirname, '../dist')));

// The "catchall" handler: for any request that doesn't match an API route, send back React's index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

// For Vercel, it handles the port and server lifecycle automatically.
// We only explicitly listen if we're not running in a serverless environment.
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Backend server is running on port ${PORT}`);
  });
}

// Export the Express API for Serverless runtimes like Vercel
export default app;
