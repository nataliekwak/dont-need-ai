import express from 'express';
import assignmentRoutes from './routes/assignmentRoutes.js';

const app = express();

app.use('/api/assignments', assignmentRoutes);

app.listen(5001, () => {
    console.log('Server is running on port 5001');
});