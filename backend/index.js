import express from "express";
import cors from "cors";
import authRouter from './src/routes/auth.routes.js'
import usersRouter from './src/routes/users.routes.js'
import elementsRouter from './src/routes/elements.routes.js'
import categoriesRouter from './src/routes/categories.routes.js'
import sizesRouter from './src/routes/sizes.routes.js'
import movementsRouter from './src/routes/movements.routes.js'
import detailsRouter from './src/routes/movements_details.routes.js'
import sheetsRouter from './src/routes/sheets.routes.js'
import { isAdmin } from "./src/middlewares.js";
import endPoints from 'express-list-endpoints'
const app = express()
const port = 8000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/auth", authRouter)
app.use("/v1", usersRouter)
app.use("/v1", elementsRouter)
app.use("/v1", sheetsRouter)
app.use("/v1", isAdmin, categoriesRouter)
app.use("/v1", isAdmin, sizesRouter)
app.use("/v1", isAdmin, movementsRouter)
app.use("/v1", isAdmin, detailsRouter)

app.get("/routes", (req, res, next) => {
    res.status(200).send(endPoints(app))
})


app.listen(port, () => {
    console.log("Listening on port ", port);
})