import express from 'express';
import cors from 'cors';
import userRouter from './src/routes/userRouter.js';
import cookieParser from 'cookie-parser';
import categoryRouter from './src/routes/categoryRouter.js';

const app = express();

// Enable CORS for all routes
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
// app.use(express.static('public'));


app.get('/', (req, res) => {
    res.send('Welcome to Moco Mart API');
})
app.use('/api/auth/user', userRouter)
app.use('/api/admin/categories', categoryRouter)


export default app;
