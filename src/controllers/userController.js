const User = require('../models/user');  // now i have thr structure of the user
const mongoose = require('mongoose');


exports.getAllUsers = async(req,res,next)=>{
    try {
        const users = await User.find();
        res.status(200).json(users)
    } catch (error) {
        next(error);
    }
}

exports.getUserById = async (req, res, next) => {
    try {
        // Check if the ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

exports.createUser = async(req,res,next)=>{

    try {
        const user = new User(req.body);
        const savedUser = await user.save();
        res.status(201).json({message: 'User has been saved :)'})
    } catch (error) {
        next(error);
    }
}

exports.updateUser = async(req,res,next)=>{

    try {
        // Check if the ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Invalid user ID' });
        }

        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators:true});
        if(!user)
            {
                res.status(402).json({message: 'The user you are updating is not found'});
            }
            else
            {
                res.status(200).json({user});
            }
    } catch (error) {
        next(error);
    }
}

exports.deleteUser = async(req,res,next)=>{

    try {
           // Check if the ID is a valid ObjectId
           if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
           return res.status(400).json({ message: 'Invalid user ID' });
        }

        const user = await User.findByIdAndDelete(req.params.id);
        if(!user)
            {
                res.status(404).json({message: 'The user you are deleting is not found'});
            }
            else
            {
                res.status(200).json({message:'user is deleted', user: user })
            }
    } catch (error) {
        next(error);
    }
}