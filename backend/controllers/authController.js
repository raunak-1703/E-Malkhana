import User from "../model/User.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const loginUser = async (req,res)=>{
    try {
        const {username,password} = req.body;

        if(!username || !password){
            return res.status(400).json({message:'All fields are required'})
        }

        const user = await User.findOne({username})
        if(!user){
            return res.status(401).json({message:'Invalid Credentials'})
        }
        if(user.password!==password){
           return res.status(401).json({message:'Invalid Credentials'})
        }
        const token = jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:'1d'}
        );

        res.status(200).json({
            message:'Login Successful',
            token,
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).json({message:'Server error'})
    }
}