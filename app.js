import express from 'express';
import dotenv from 'dotenv';
import path from 'path'
import { AppError } from './utils/appError.js';
import api from './routes/index.js'
import errorHandler from './middlewares/errorHandler.js';
import { rateLimit } from 'express-rate-limit'
import helmet from 'helmet'
import morgan from 'morgan'
import cros from 'cors'
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import { cloudinaryConfig } from './utils/cloudinary.js';
import hpp from 'hpp';

import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
// import { getHotelPrices } from './utils/searchHotels.js';
// import agodaClient from './utils/agodaClient.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, './.env') })
cloudinaryConfig()
// agodaClient()
// getHotelPrices()


const app = express();

const swaggerDocument = YAML.load(path.join(__dirname, './docs/swagger.yaml'));


app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello from the root'
    })
})




app.use(cookieParser()); 


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cros({
    origin: process.env.NODE_ENV === 'production' ? process.env.FRONTEND_URL : '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true
}))

// Hide powered-by header
app.disable('x-powered-by');

// Set security headers with stricter helmet config
app.use(helmet({
    crossOriginResourcePolicy: { policy: "same-origin" },
    contentSecurityPolicy: false // If you need to allow inline scripts/styles for Swagger
}));

// Prevent HTTP Parameter Pollution
app.use(hpp());

// Use express.json before express.urlencoded
app.use(express.json({ limit: '20kb' }));
app.use(express.urlencoded({ extended: true }));

// limit body payload to prevent 'denial of service attack'
// limit the number of request for the same ip per window
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100000, // Limit each IP to 1000 requests per `window` (here, per 15 minutes).
    message: 'too many requests from this IP, try again in 15 minutes'
})
app.use('/api', limiter)


// request logger 
app.use(morgan('dev'))






app.use('/api/v1', api)


app.use((req, res, next) => {
  next(new AppError(`Not Found - ${req.originalUrl}`, 404));
});
app.use(errorHandler)





export default app;




