import { Router } from 'express'
import { getSizes, createSize, getSizeById, updateSizeById, deleteSizeById } from '../services/sizes.service.js'
import { isAdmin, isAuthenticated } from '../middlewares.js'

const router = Router()

router.get("/sizes", async (req, res, next) => {
    try {
        const size = await getSizes() 
        res.json(size)
    } catch (error) {
        next(error)
    }
})

router.post("/sizes", async (req, res, next) => {
    try {
        const data = req.body
        const size = await createSize(data)
        res.json(size)
    } catch (error) {
        next(error)
    }
})

router.get("/sizes/:id", async (req, res, next) => {
    try {
        const { id } = req.params
        const size = await getSizeById(id)
        res.json(size)
    } catch (error) {
        next(error)
    }
})

router.put("/sizes/:id", async (req, res, next) => {
    try {
        const { id } = req.params
        const data = req.body
        const size = await updateSizeById(id, data)
        res.json(size)
    } catch (error) {
        next(error)
    }
})

router.delete("/sizes/:id", async (req, res, next) => {
    try {
        const { id } = req.params
        await deleteSizeById(id)
        res.status(201).send({ message: 'Delete size!'})
    } catch (error) {
        next(error)
    }
})

export default router