import { Router } from 'express';
import { getSheets, setSheets, toggleStateSheet, updateSheet } from '../services/sheets.service.js';
import { toggleStateElement } from '../services/elements.service.js';


const router = Router();

router.get("/sheets", async (req, res, next) => {
    try {
        const sheets = await getSheets()
        res.json(sheets)
    } catch (error) {
        next(error)
    }
})

router.post("/sheets", async (req, res, next) => {
    try {
        const { id, name } = req.body
        const sheets = await setSheets({ id, name })

        res.json(sheets)
    } catch (error) {
        next(error)
    }
})

router.put("/sheets/:id", async (req, res, next) => {
    try {
        const data = req.body
        const { id } = req.params;
        const sheet = await updateSheet(id, data)
        res.json(sheet)
    } catch (error) {
        next(error)
    }
})

router.delete("/sheets/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        await toggleStateSheet(id)

        res.status(201).send({ message: 'Toggle Element state'})
    } catch (error) {
        next(error)
    }
})

export default router