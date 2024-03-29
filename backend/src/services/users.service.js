import prisma from "../../utils/prisma.js";
import bcrypt from 'bcrypt'

function findUserByEmail(email) {
    return prisma.users.findFirst({
        where: {
            email: email
        }
    })
}

function createUserByNameAndEmailAndPassword(user) {
    user.password = bcrypt.hashSync(user.password, 12)
    return prisma.users.create({
        data: {
            id: parseInt(user.id),
            email: user.email,
            name: user.name,
            password: user.password
        }
    })
}


function getUsers() {
    return prisma.users.findMany();
}

function createUser(user) {
    user.password = bcrypt.hashSync(user.password, 12)
    return prisma.users.create({
        data: {
            ...user
        }
    })
}

function findUserById(id) {
    return prisma.users.findUnique({
        where: {
            id: id
        }
    })
}

async function updateUserById(id, user) {
    if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }
    return prisma.users.update({
        where: {
            id: id,
        },
        data: {
            ...user,
        },
    });
}

export {
    findUserByEmail,
    createUserByNameAndEmailAndPassword,
    getUsers,
    createUser,
    findUserById,
    updateUserById
}