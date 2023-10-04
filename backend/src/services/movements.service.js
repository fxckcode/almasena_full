import prisma from '../../utils/prisma.js'

export function getMovements() {
    return prisma.movements.findMany({
        include: {
            users: true,
            details_movements: true
        }
    })
}

export function createMovement(data) {
    return prisma.movements.create({
        data: {
            ...data
        }
    })
}

export function getMovementById(id) {
    return prisma.movements.findUnique({
        where: {
            id: parseInt(id)
        }, include: {
            users: true,
            details_movements: true
        }
    })
}

export function updateMovementById(id, data) {
    return prisma.movements.update({
        where: {
            id: parseInt(id)
        }, data: {
            ...data
        }
    })
}

export function deleteMovement(id) {
    return prisma.movements.delete({
        where: {
            id: parseInt(id)
        }
    })
}