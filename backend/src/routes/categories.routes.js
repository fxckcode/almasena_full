import { Router } from "express";
import { getCategories, createCategorie, getCategorieById, updateCategorieById, deleteCategorieById } from "../services/categories.service.js";

const router = Router()

router.get("/categories", async (req, res, next) => {
    try {
        const categories = await getCategories();
        res.json(categories)
    } catch (error) {
        next(error)
    }
})

router.post("/categories", async (req, res, next) => {
    try {
        const data = req.body
        const categorie = await createCategorie(data)
        res.json(categorie)
    } catch (error) {
        next(error)
    }
})

router.get("/categories/:id", async (req, res, next) => {
    try {
        const { id } = req.params
        const categorie = getCategorieById(id)

        res.json(categorie)
    } catch (error) {
        next(error)
    }
})

router.put("/categories/:id", async (req, res, next) => {
    try {
        const { id } = req.params
        const data = req.body
        const categorie = updateCategorieById(id, data)

        res.json(categorie)

    } catch (error) {
        next(error)
    }
})

router.delete("/categories/:id", async (req, res, next) => {
    try {
        const { id } = req.params
        await deleteCategorieById(id)

        res.status(201).send({ message: 'Delete categorie!'})
    } catch (error) {
        next(error)
    }
})

export default router