import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
    try {
        const { name, password } = req.body;

        const isUsed = await User.findOne({ name });

        if (isUsed) {
            return res.json({
                message: 'This name was declared'
            });
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = new User({
            name,
            password: hash,
        });

        const token = jwt.sign(
            {
                id: newUser._id,
            },
            'ofghjiDFJBNuigjiopdfk9082348hgfjDFDirkd9o3',
            { expiresIn: '30d' }
        );

        await newUser.save();

        res.json({
            newUser,
            token,
            message: 'Seccesful register'
        });

    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const login = async (req, res) => {
    try {
        const { name, password } = req.body;
        
        if (name && password) {
            const user = await User.findOne({ name });
            if (!user) {
                return res.json({ message: { name: 'Error, user is not declared' } })
            }

            const isPasswordCorrect = await bcrypt.compare(password, user.password)

            if (!isPasswordCorrect) {
                return res.json({ message: { pass: 'Passwsord is uncorect' } })
            }

            const token = jwt.sign({
                id: user._id,
            },
                'ofghjiDFJBNuigjiopdfk9082348hgfjDFDirkd9o3',
                { expiresIn: '30d' }
            );

            res.json({
                token,
                user,
                message: 'You are logged in'
            })
        }


    } catch (e) {
        res.json({ message: 'Error login :(' })
    }
}