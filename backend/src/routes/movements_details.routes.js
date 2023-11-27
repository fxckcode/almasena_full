import { Router } from "express";
import { getDetails, createDetails, getDetailById, deleteDetailById } from "../services/movements_details.service.js";
import prisma from "../../utils/prisma.js";

const router = Router()

router.get("/details", async (req, res, next) => {
    try {
        const details = await getDetails();
        res.json(details)
    } catch (error) {
        next(error)
    }
})

router.post("/details", async (req, res, next) => {
    try {
        const data = req.body
        const details = createDetails(data)
        res.json(details)
    } catch (error) {
        next(error)
    }
})

router.get("/details/:id", async (req, res, next) => {
    try {
        const { id } = req.params
        const detail = getDetailById(id)
        res.json(detail)
    } catch (error) {
        next(error)
    }
})

router.get("/details/byproduct/:id_element", async (req, res, next) => {
    try {
        const { id_element } = req.params
        const detail = await prisma.details_movements.findMany({
            where: {
                id_element: parseInt(id_element)
            }, include: {
                elements: {
                    include: {
                        sizes: true,
                        categories: true
                    }
                },
                movements: {
                    include: {
                        users: true,
                        sheets: true
                    }
                }
            }
        })

        res.json(detail)
    } catch (error) {
        next(error)
    }
})

router.get("/details/byuser/:id_user", async (req, res, next) => {
    try {
        const { id_user } = req.params;
        const detail = await prisma.details_movements.findMany({
            where: {
                movements: {
                    id_user: parseInt(id_user)
                }
            }, include: {
                elements: {
                    include: {
                        sizes: true,
                        categories: true,
                    },
                },
                movements: {
                    include: {
                        users: true,
                        sheets: true
                    }
                }
            }
        })
        res.json(detail)
    } catch (error) {
        console.error(error);
    }
})

router.get("/details/bysheet/:sheet_id", async (req, res, next) => {
    try {
        const { sheet_id } = req.params;
        const detail = await prisma.details_movements.findMany({
            where: {
                movements: {
                    sheet_id: parseInt(sheet_id)
                }
            }, include: {
                elements: {
                    include: {
                        sizes: true,
                        categories: true,
                    },
                },
                movements: {
                    include: {
                        users: true,
                        sheets: true
                    }
                }
            }
        })
        res.json(detail)
    } catch (error) {
        console.error(error);
    }
})

router.put("/details/:id", async (req, res, next) => {
    try {
        const { id } = req.params
        const data = req.body
        const detail = updateDetailById(id, data)
        res.json(detail)
    } catch (error) {
        next(error)
    }
})


router.delete("/details/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        await deleteDetailById(id)
        res.status(201).send({ message: "Delete detail!" })
    } catch (error) {
        next(error)
    }
})

export default router 