export const authorizeRole = (requiredRole) => {
    return (req, res, next) => {
        const user = req.user

        if (!user) {
            return res.status(401).send({ status: 'error', message: 'Unauthorized' })
        }

        if (user.role !== requiredRole) {
            return res.status(403).send({ status: 'error', message: `Access denied for role: ${user.role}` });
        }

        next()
    }
}
