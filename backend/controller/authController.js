const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
}

exports.registerUser = async (req, res) => {
    try {
        const {username, name, lastName, email, password} = req.body;

        const userExist = await User.findOne({ username });
        const emailExist = await User.findOne({ email });

        if (emailExist) {
            return  res.status(400).json({ message: 'Ese email ya está registrado' });
        }
        if (userExist) {
            return res.status(400).json({ message: 'Ese username ya está registrado' });
        }
        
        const user = await User.create({
            username,
            name,
            lastName,
            email,
            password,
        });

        if (user) { 
            res.status(201).json({
                _id: user._id,
                username: user.username,
                name: user.name,
                lastName: user.lastName,
                email: user.email,
                token: generateToken(user._id),
            })
        }
    } catch (error) {
        res.status(400).json({ message: 'Error al registrar el usuario', error: error.message });
}
};

exports.loginUser = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email});

        if (user && (await user.matchPassword(password))) {
            res.json({
                id: user._id,
                username: user.username,
                email: user.email,
                token: generateToken(user._id),
            })
        } else {
            res.status(401).json({ message: 'Credenciales inválidas' });
        }
    
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
}