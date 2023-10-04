import prisma from "../../utils/prisma.js";

export function getSizes() {
    return prisma.sizes.findMany();
}

export function createSize(data) {
    return prisma.sizes.create({
        data: {
            ...data
        }
    })
}

export function getSizeById(id) {
    return prisma.sizes.findUnique({
        where: {
            id: parseInt(id)
        }
    })
}

export function updateSizeById(id, data) {
    return prisma.sizes.update({
        where: {
            id: parseInt(id)
        }, data: {
            ...data
        }
    })
}

export function deleteSizeById(id) {
    return prisma.sizes.delete({
        where: {
            id: parseInt(id)
        }
    })
}