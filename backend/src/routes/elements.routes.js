import { Router } from 'express'
import { createElement, toggleStateElement, findElementById, getElements, updateElementById } from '../services/elements.service.js'
import { isAdmin, isAuthenticated } from '../middlewares.js'
const router = Router()


router.get("/elements", isAuthenticated, async (req, res, next) => {
    try {
        const elements = await getElements()
        res.json(elements)
    } catch (error) {
        next(error)
    }
})

router.post("/elements", isAdmin, async (req, res, next) => {
    try {
        const element = req.body;

        const newElement = await createElement(element)

        res.json(newElement)

    } catch (error) {
        next(error)
    }
})

router.get("/elements/:id", isAdmin, async (req, res, next) => {
    try {
        const { id } = req.params;

        const element = await findElementById(id)

        res.json(element)
    } catch (error) {
        next(error)
    }
})

router.put("/elements/:id", isAdmin, async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const updateElement = await updateElementById(id, data)

        res.json(updateElement)
    } catch (error) {
        next(error)
    }
})

router.delete("/elements/:id", isAdmin, async (req, res, next) => {
    try {
        const { id } = req.params;
        await toggleStateElement(id)

        res.status(201).send({ message: 'Toggle Element state'})
    } catch (error) {
        next(error)
    }
})

export default router