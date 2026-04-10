import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import dashboardRoutes from '../routes/dashboardRoutes.js';
import complaintsRoutes from '../routes/complaintsRoutes.js';
import paymentsRoutes from '../routes/paymentsRoutes.js';
import facilitiesRoutes from '../routes/facilitiesRoutes.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// Main Router Definitions
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/complaints', complaintsRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api/facilities', facilitiesRoutes);

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
