import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import initializeConnection from './server/config/db.js';

// Import your routes
import authRoutes from './server/routes/auth.js';
import userRoutes from './server/routes/user.js';
import coordinatorRoutes from './server/routes/coordinator.js';
import moaRoutes from './server/routes/moa.js'
import hteRoutes from './server/routes/hte.js'
import ipRoutes from './server/routes/ip.js'
import adminRoutes from './server/routes/admin.js'
import overviewRoutes from './server/routes/overview.js';

dotenv.config();

// Handle __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express App
const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Serve static files
app.use(express.static(path.join(__dirname, '../src/dist')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use(express.static(path.join(__dirname, 'src/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/dist', 'index.html'));
});



// Database Initialization and Server Start
const startServer = async () => {
  let dbConnection;
  try {
    const dbConnection = await initializeConnection();

    // Middleware to make the DB connection available in routes
    app.use((req, res, next) => {
      req.db = dbConnection;
      next();
    });

    // Define API Routes
    app.use('/api/auth', authRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/coordinator', coordinatorRoutes);
    app.use('/api/moa', moaRoutes);
    app.use('/api/hte', hteRoutes);
    app.use('/api/ip', ipRoutes);
    app.use('/api/admin', adminRoutes);
    app.use('/api/overview', overviewRoutes);


    // Start Server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  } finally {
    if (dbConnection) dbConnection.end();
}
};

startServer();
