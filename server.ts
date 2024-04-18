import express from 'express'
import { setupDB } from './database/dbSetup'
import userRoutes from './routes/userRoutes'
import taskRoutes from './routes/tasksRoutes'

const cors = require('cors')

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}

export async function startServer() {
    try {
        await setupDB()
        const port = 3001
        const app = express()
        app.use(express.json())
        app.use(cors(corsOptions))

        app.use('/api/users', userRoutes)
        app.use('/api/tasks', taskRoutes)

        app.listen(port, () => {
            console.log(`App listening on port ${port}`)
        })
    } catch (error) {
        console.error(error)
    }
}
