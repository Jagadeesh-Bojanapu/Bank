const User = require('../Models/user')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')

exports.register = async (email, password, fullName, address, phone, role = 'user') => {
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error("User already exists");
        }
        const newUser = new User({ email, password, fullName, address, phone, role });
        await newUser.save();
        return "User registered successfully";
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.login = async (email, password, role = 'user') => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if (!isMatch) {
            throw new Error("Invalid password");
        }
        const token = jwt.sign({ userId: user._id }, 'jwt_secret_key', { expiresIn: 60*60}); 
        return token
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.logout=()=>{

}