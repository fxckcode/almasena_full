import prisma from "../../utils/prisma.js";


export function getCategories() {
    return prisma.categories.findMany()
}

export function createCategorie(data) {
    return prisma.categories.create({
        data: {
            ...data
        }
    })
}

export function getCategorieById(id) {
    return prisma.categories.findUnique({
        where: {
            id: parseInt(id)
        }
    })
}

export function updateCategorieById(id, data) {
    return prisma.categories.update({
        where: {
            id: parseInt(id)
        }, data: {
            ...data
        }
    })
}

export function deleteCategorieById(id) {
    return prisma.categories.delete({
        where: {
            id: parseInt(id)
        }
    })
}