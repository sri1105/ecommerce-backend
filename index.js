// Required modules
import express from "express";
import dotenv from "dotenv";
import logger from "./logger.js";
import connectDB from "./db/db.js";
import { businessRouter } from "./routers/businessRouter.js";
import { customerRouter } from "./routers/customerRouter.js"; 
import cors from 'cors';


dotenv.config();
connectDB();


const app = express();
const corsOptions = {
   methods: ['POST']
};

app.use(express.json());
app.use(cors(corsOptions));
app.use('/business', businessRouter);
app.use('/customer', customerRouter);


app.get('/', (req, res)=> {
    res.send(`<h1>Welcome to the Ecommerce backend</h1>`);
});

app.listen(process.env.PORT, () => {
   logger.info(`App Server is running`);
});