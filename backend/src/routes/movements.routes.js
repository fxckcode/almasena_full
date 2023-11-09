import { Router } from 'express'
import { getMovements, createMovement, getMovementById, updateMovementById, deleteMovement } from '../services/movements.service.js'
import { createDetails } from '../services/movements_details.service.js'
import prisma from '../../utils/prisma.js'
const router = Router()

router.get("/movements", async (req, res, next) => {
    try {
        const movements = await getMovements()
        res.json(movements)
    } catch (error) {
        next(error)
    }
})

router.post("/movements", async (req, res, next) => {
    try {
        const data = req.body;
        const movement = await createMovement(data)
        const dataDatails = {
            id_movement: movement.id,
            id_element: parseInt(data.element),
            cant: parseInt(data.cant)
        }
        const movement_details = await createDetails(dataDatails)
        const element = await prisma.elements.findFirst({
            where: {
                id: parseInt(data.element)
            }
        })

        await prisma.elements.update({
            data: {
                stock: parseInt(element.stock) + parseInt(data.cant)
            }, where: {
                id: parseInt(data.element)
            }
        })

        res.json(movement_details)
    } catch (error) {
        next(error)
    }
})

router.get("/movements/:id", async (req, res, next) => {
    try {
        const { id } = req.params
        const movement = await getMovementById(id)
        res.json(movement)
    } catch (error) {
        next(error)
    }
})

router.put("/movements/:id", async (req, res, next) => {
    try {
        const { id } = req.params
        const data = req.body
        const movement = await updateMovementById(id, data)
        res.json(movement)
    } catch (error) {
        next(error)
    }
})

router.delete("/movements/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        await deleteMovement(id)
        res.status(201).send({ message: "Delete movement!!!"})
    } catch (error) {
        next(error)   
    }
})

export default router