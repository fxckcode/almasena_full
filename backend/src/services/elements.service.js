import prisma from "../../utils/prisma.js";

export function getElements() {
    return prisma.elements.findMany({
        include: {
            categories: true,
            sizes: true
        }
    })
}

export function createElement(data) {
    return prisma.elements.create({
        data: {
            ...data
        }
    })
}

export function findElementById(id) {
    return prisma.elements.findUnique({
        where: {
            id: parseInt(id)
        }, include: {
            categories: true,
            sizes: true
        }
    })
}

export function updateElementById(id, data) {
    return prisma.elements.update({
        where: {
            id: parseInt(id)
        }, data: {
            ...data
        }
    })
}

export async function toggleStateElement(id) {
    const element = await prisma.elements.findFirst({
        where: {
            id: parseInt(id)
        }
    })

    return prisma.elements.update({
        where: {
            id: parseInt(id)
        }, data: {
            state: element.state == 'active' ? 'inactive' : 'active'
        }
    })
}