import express from 'express';
import mongoose from 'mongoose';
import bodyparser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors'
import routes from './view/index.js';
dotenv.config();

const url = process.env.MONGO_URL;
const app = express();
const port = 5000;
app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type, Authorization');
    next();
});

app.use(cors());


app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }))


app.use('/', routes);

app.use((err, req, res, next) => {
    console.error('Global error handler:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  });
  

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(port, (err) => {
    if (err) {
        console.error('Error starting the server:', err);
    } else {
        console.log(`Server listening on port ${port}!`);
    }
});
