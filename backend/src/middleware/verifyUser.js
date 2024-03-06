import jwt from 'jsonwebtoken'

export const authVerify = (req, res, next) => {
    try {
        const token = req.cookies?.auth_token
        if (!token) {
            return res.status(404).json({ message: 'Not Authorized' })
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(404).json({ message: 'No Found Token' })
            }
            req.user = user
            next()
        })
    } catch (error) {
        return res.status(500).json({ message: 'Server Error' })
    }
}