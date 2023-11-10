import { Router } from 'express'
import { createUserByNameAndEmailAndPassword, findUserByEmail } from '../services/users.service.js';
import { createToken } from '../services/auth.service.js';
import bcrypt from 'bcrypt';
import { isAuthenticated } from '../middlewares.js';
import jwt from 'jsonwebtoken';
import prisma from '../../utils/prisma.js';
const router = Router()

router.post('/register', async (req, res, next) => {
    try {
        const { name, email, password, id} = req.body;
        if (!name || !email || !password || !id) {
            res.status(400)
            throw new Error("You must provide an email and a password.")
        }

        const existingUser = await findUserByEmail(email)

        if (existingUser) {
            res.status(400).send({ "mensaje": "Correo ya existente"})
        }

        const user = await createUserByNameAndEmailAndPassword({name, email, password, id})
        const token = createToken(user)

        res.json({
            token
        })
        

    } catch (error) {
        res.status(400) 
    }
})

router.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400)
            throw new Error("You must provide an email and a password.")
        }

        const existingUser = await findUserByEmail(email)

        if (!existingUser) {
            res.json(403).send({ message: "Invalid login credentials." })
            throw new Error("Invalid login credentials.")
        }

        const validPassword = await bcrypt.compare(password, existingUser.password)
        if (!validPassword) {
            res.json(403).send({ message: "Invalid login credentials." })
            throw new Error("Invalid login credentials.")
        }

        const token = createToken(existingUser)

        res.json({
            token,
            user: existingUser
        })

    } catch (error) {
        next(error)
    }
})

router.get("/getUser", isAuthenticated, async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        res.status(401).send({ message: "🚫 Un-Authorized 🚫"});
    }

    try {
        const token = authorization.split(' ')[1];
        const data = jwt.verify(token, process.env.SECRET_TOKEN)
        const user = await prisma.users.findUnique({
            where: {
                id: data.id
            }
        })
        if (user) {
            res.json({
                user
            })
        } else {
            res.status(400).send({ message: "Access denied!" });
        }
    } catch (error) { 
        console.log(error);
    }
})


export default router