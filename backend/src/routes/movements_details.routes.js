import { Router } from "express";
import { getDetails, createDetails, getDetailById, deleteDetailById } from "../services/movements_details.service.js";

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