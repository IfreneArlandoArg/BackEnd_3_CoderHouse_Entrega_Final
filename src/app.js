import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';
import dotenv from 'dotenv';
dotenv.config();



const app = express();
const PORT = process.env.PORT||8080;
const connection = mongoose.connect(process.env.MONGODB_URL)




app.use(express.json());
app.use(cookieParser());

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/api/mocks',mocksRouter);

// Swagger definition for Users module
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Users API',
        version: '1.0.0',
        description: 'API documentation for Users module'
    },
    servers: [
        { url: 'http://localhost:' + PORT + '/api' }
    ]
}

const options = { swaggerDefinition, apis: [] }
const swaggerSpec = swaggerJSDoc(options)
swaggerSpec.paths = swaggerSpec.paths || {}
swaggerSpec.paths['/users'] = {
    get: {
        tags: ['Users'],
        summary: 'Get all users',
        responses: { '200': { description: 'A list of users' } }
    }
}
swaggerSpec.paths['/users/{uid}'] = {
    get: {
        tags: ['Users'],
        summary: 'Get user by id',
        parameters: [{ name: 'uid', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'User found' }, '404': { description: 'User not found' } }
    },
    put: {
        tags: ['Users'],
        summary: 'Update user by id',
        parameters: [{ name: 'uid', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'User updated' }, '404': { description: 'User not found' } }
    },
    delete: {
        tags: ['Users'],
        summary: 'Delete user by id',
        parameters: [{ name: 'uid', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'User deleted' } }
    }
}

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.listen(PORT,()=>console.log(`Listening on Port : ${PORT}`))

export default app
