import express from 'express'
import { setupDB } from './database/dbSetup'
import pagesRoutes from './routes/pagesRoutes'

const cors = require('cors')

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}

export async function startServer() {
    try {
        await setupDB()
        const port = 3000
        const app = express()
        app.use(express.json())
        app.use(cors(corsOptions))

        app.use('/api/pages', pagesRoutes)

        app.listen(port, () => {
            console.log(`App listening on port ${port}`)
        })
    } catch (error) {
        console.error(error)
    }
}
