import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config'

import userRoutes from '././routes/user.route.js'

const app = express();

const port = process.env.PORT;
const mongodbURI = process.env.DB_CONNECT;

// Parsing data
app.use(express.json());

// CORS Policy
app.use(cors());

// Load Routes
app.use("/api/user", userRoutes)

// Connecting to database
mongoose.connect(mongodbURI, {
    dbName : 'authDB',
})
.then(
    app.listen(port, () => {
        console.log(`server started on port ${port}`)
    })
).catch((error) => {
    console.log(error);
})
