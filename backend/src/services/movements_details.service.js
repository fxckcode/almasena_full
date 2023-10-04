import prisma from '../../utils/prisma.js'


export function getDetails() {
    return prisma.details_movements.findMany({
        include: {
            elements: true,
            movements: true
        }
    })
}

export function createDetails(data) {
    return prisma.details_movements.create({
        data: {
            ...data
        }
    })
}

export function getDetailById(id) {
    return prisma.details_movements.findUnique({
        where: {
            id: parseInt(id)
        }, include: {
            movements: true,
            elements: true
        }
    })
}

export function updateDetailById(id, data) {
    return prisma.details_movements.update({
        where: {
            id: parseInt(id)
        }, data: {
            ...data
        }, include: {
            movements: true,
            elements: true
        }
    })
}

export function deleteDetailById(id) {
    return prisma.details_movements.delete({
        where: {
            id: parseInt(id)
        }
    })
}