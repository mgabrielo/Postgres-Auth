import pool from "../database/db.js";
import { getRegisterUser, getUserByEmail } from "../queries/authQueries.js";
import { generateJWT } from "../utils/generateJWT.js";
import bcrypt from 'bcrypt'
import { validationResult } from "express-validator";

//express validation

export const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }
    try {
        const { username, email, password } = req.body
        const exsitingUser = await pool.query(getUserByEmail, [email])
        if (exsitingUser?.rows?.length === 0) {
            const genSalt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, genSalt)
            const newUser = await pool.query(getRegisterUser, [username, email, hashedPassword]);
            if (newUser?.rows[0].id) res.status(200).json({ message: 'User Registered Successfully' })
        } else {
            res.status(401).json({ message: 'user already exist' })
        }

    } catch (error) {
        res.status(500).json({ error: error?.message })
    }
}


export const loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }

    try {
        const { email, password } = req.body
        const exsitingUser = await pool.query(getUserByEmail, [email])

        if (exsitingUser?.rows?.length === 0) {
            res.status(401).json({ msg: 'password or email is incorrect' })
        } else {
            const validPassword = await bcrypt.compare(password, exsitingUser?.rows[0]?.password)
            if (validPassword) {
                const token = generateJWT(exsitingUser?.rows[0].id)
                const { id } = exsitingUser?.rows[0]
                res.status(200).cookie('auth_token', token, { httpOnly: true }).json({
                    message: 'Login Successful',
                    userId: id
                })
            }
        }

    } catch (error) {
        res.status(500).json({ error: error?.message })
    }
}


export const logOutUser = async (req, res) => {
    const { userId } = req.params
    if (req.user.id !== parseInt(userId)) {
        res.status(401).json({ message: 'Not Authorized' })
    }
    try {
        res.clearCookie('auth_token').status(200).json({ message: 'User Signed out Successfully' })
    } catch (error) {
        res.status(500).json({ error: error?.message })
    }
}