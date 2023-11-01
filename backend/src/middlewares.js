import jwt from 'jsonwebtoken'
export const isAuthenticated = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        res.status(401).send({ message: "🚫 Un-Authorized 🚫"});
    }

    try {
        const token = authorization.split(' ')[1];
        jwt.verify(token, process.env.SECRET_TOKEN)
        return next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            res.status(401).send({ message: "Token expired" });
        } else {
            console.log(err);
        }
    }

}

export const isAdmin = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        res.status(401).send({ message: "🚫 Un-Authorized 🚫"});
    }

    try {
        const token = authorization.split(' ')[1];
        const data = jwt.verify(token, process.env.SECRET_TOKEN)
        if (data.rol == 'admin') {
            return next()
        } else {
            res.status(400).send({ message: "Access denied!" });
        }
    } catch (error) { 
        if (err.name === 'TokenExpiredError') {
            res.status(401).send({ message: "Token expired" });
        } else {
            console.log(err);
        }
    }
}