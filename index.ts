import express, { Request, Response } from 'express'
import { PrismaClient } from "@prisma/client"

const app = express()
app.use(express.json())

const prisma = new PrismaClient()

app.post("/", async (req: Request, res: Response) => {
    const { username, password } = req.body
    const user = await prisma.user.create({
        data: {
            username,
            password
        }
    })
    res.json(user)
})

app.get("/:id", async (req: Request, res: Response) => {
    const { id } = req.params
    const user = await prisma.user.findFirst({
        where: {
            id: Number(id)
        }
    })
    res.json(user)
})

app.put("/:id", async (req: Request, res: Response) => {
    const { id } = req.params
    const { username, password } = req.body
    const user = await prisma.user.update({
        where: {
            id: Number(id)
        },
        data: {
            username,
            password
        }
    })
    res.json(user)
})

app.delete("/:id", async (req: Request, res: Response) => {
    const { id } = req.params
    const user = await prisma.user.delete({
        where: {
            id: Number(id)
        }
    })
    res.json(user)
})

app.post("/createManyUsers/", async (req: Request, res: Response) => {
    const { userList } = req.body
    const users = await prisma.user.createMany({
        data: userList
    })
    res.json(users)
})

app.post("/createManyCars/", async (req: Request, res: Response) => {
    const { carList } = req.body
    const cars = await prisma.car.createMany({
        data: carList
    })
    res.json(cars)
})

app.listen(3001, () => {
    console.log("SERVER RUNNING ON PORT 3001")
})