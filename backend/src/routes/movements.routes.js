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
                stock: parseInt(element.stock) + parseInt(data.cant),
                state: "active"
            }, where: {
                id: parseInt(data.element)
            }
        })

        res.json(movement_details)
    } catch (error) {
        next(error)
    }
})

router.post("/movements/exits", async (req, res, next) => {
    try {
        const { elements, quantities, sheet, description, selectedUser } = req.body
        const movement = await prisma.movements.create({
            data: {
                sheet: parseInt(sheet),
                description: description,
                id_user: parseInt(selectedUser),
                type: "output"
            }
        })

        const exitPromises = elements.map(async (element) => {
            const updatedStock = parseInt(element.stock) - parseInt(quantities[element.id]);
            const quantity = parseInt(quantities[element.id]);

            if (quantity === 0) {
              // Puedes manejar este caso según tus necesidades, por ejemplo, lanzar un error, omitir la actualización, etc.
              console.error(`La cantidad para el elemento ${element.id} es cero.`);
              return null; // Otra opción podría ser devolver null o cualquier otro valor que indique que la operación no debe continuar
            }
            const exit = await prisma.details_movements.create({
                data: {
                    id_movement: parseInt(movement.id),
                    id_element: parseInt(element.id),
                    cant: parseInt(quantities[element.id])
                },
            });

            await prisma.elements.update({
                where: {
                    id: parseInt(element.id)
                }, data: {
                    stock: updatedStock,
                    state: updatedStock === 0 ? 'inactive' : 'active'
                }
            })

            return exit;
        });

        const exits = await Promise.all(exitPromises);

        res.json(exits)
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
        res.status(201).send({ message: "Delete movement!!!" })
    } catch (error) {
        next(error)
    }
})

export default router