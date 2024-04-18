import express, { Request, Response } from 'express'
import { db } from '../database/dbSetup'
import { Page } from '../types/db'

const router = express.Router()

// GET METHOD API URL | RETRIEVE ITEMS
router.get('/', (req: Request, res: Response<Page[]>) => {
    // return all Pagels
    db.Page.findAll().then((pages) => {
        res.json(pages)
    })
})

// POST METHOD API URL | CREATE ITEM
router.post(
    '/',
    (
        req: Request<{}, {}, Partial<Page>>,
        res: Response<Page[] | { message: string }>
    ) => {
        try {
            db.Page.create(req.body)
                .then((newPage) => {
                    db.Page.findAll().then((Pages) => {
                        res.json(Pages)
                    })
                })
                .catch((error) => {
                    // Handle error during Page creation
                    console.error(error)
                    res.status(500).json({
                        message: 'Failed to create Page',
                    })
                })
        } catch (e) {
            console.error(e)
            res.status(500).json({ message: 'Internal server error' })
        }
    }
)

// DELETE METHOD API URL | DELETE ITEM
router.delete('/:id', (req, res) => {
    // delete a Page
    db.Page.destroy({
        where: {
            id: req.params.id,
        },
    })
        .then(() => {
            res.sendStatus(200)
        })
        .catch((error) => {
            console.error(error)
            res.sendStatus(500) // Internal Server Error
        })
})

export default router
