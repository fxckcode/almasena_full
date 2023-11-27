import prisma from "../../utils/prisma.js";

function getSheets() {
    return prisma.sheets.findMany();
}

function setSheets(data) {
    return prisma.sheets.create({
        data: {
            id: parseInt(data.id),
            name: data.name
        }
    })
}

function updateSheet(id, data) {
    return prisma.sheets.update({
        where: {
            id: parseInt(id)
        }, data: {
            ...data
        }
    })
}

async function toggleStateSheet(id) {
    const sheet = await prisma.sheets.findFirst({
        where: {
            id: parseInt(id)
        }
    })

    return prisma.sheets.update({
        where: {
            id: parseInt(id)
        }, data: {
            status: sheet.status == 'active' ? 'inactive': 'active'
        }
    })
}

export {
    getSheets,
    setSheets,
    updateSheet,
    toggleStateSheet
}