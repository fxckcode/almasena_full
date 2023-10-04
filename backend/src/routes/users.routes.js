import { Router } from "express";
import { createUser, getUsers, findUserById, updateUserById } from "../services/users.service.js";
import { isAdmin, isAuthenticated } from "../middlewares.js";
import prisma from "../../utils/prisma.js";

const router = Router()

router.get('/users', isAdmin, async (req, res, next) => {
    try {
        const users = await getUsers()
        res.json(users)
    } catch (error) {
        next(error)
    }
})


router.post("/users", isAdmin, async (req, res, next) => {
    try {
        const data = req.body;
        const user = await createUser(data)
        res.json(user)
    } catch (error) {
        next(error)
    }
})

router.get("/users/:id", isAuthenticated, async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await findUserById(parseInt(id))

        if (!user) {
            res.status(400).send({ message: 'user not found'})
        }

        res.json(user)

    } catch (error) {
        next(error)
    }
})

router.put("/users/:id", isAuthenticated, async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const user = await updateUserById(parseInt(id), data)

        res.json(user)
    } catch (error) {
        next(error)
    }
})

router.delete("/users/:id", isAdmin, async (req, res, next) => {
    try {
        const { id } = req.params;
        await prisma.users.delete({
            where: {
                id: parseInt(id)
            }
        })

        res.status(201).send({ message: 'User delete!' })

    } catch (error) {
        next(error)
    }
})

export default router