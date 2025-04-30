const express = require('express') //REQUIRES EXPRESS LIBRARY
const router = express.Router() //REQUIRES EXPRESS ROUTER
const User = require('../model/user') //REQUIRES USER SCHEMA FROM user.js

// ENDPOINTS
// Getting all
router.get('/', async(req, res) => {
    try {
        const users = await User.find() //CALLS USERS, GETS ALL INFO AND STORES IT IN 'users' VARIABLE
        res.json(users) // SENDS INFO IN JSON FORMAT
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})
// Getting one
router.get('/:id', getUser, (req, res) => {
    res.send(res.user)
})
// Creating one
router.post('/', async(req, res) => {
    try {
        const user = new User({ // NEW USER OBJECT
            name: req.body.name,
            email: req.body.email,
            password: req.body.password, // hash*
            role: req.body.role || 'user',
            phone: req.body.phone,
            address: {
                street: req.body.address?.street,
                city: req.body.address?.city,
                state: req.body.address?.state,
                zip: req.body.address?.zip
            }
        });
        
        const newUser = await user.save(); //SAVE NEW USER
        res.status(201).json(newUser); //CONFIRM
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})
// Updating one
router.patch('/:id', getUser, async(req, res) => {
    const updateableFields = ['name', 'email', 'password', 'phone', 'address', 'role'];
    const updates = req.body;
    
    try {
        // Iterate through all fields in the request body
        Object.keys(updates).forEach(key => {
            if (updateableFields.includes(key)) {
                // Special handling for nested address
                if (key === 'address' && typeof updates[key] === 'object') {
                    res.user.address = { ...res.user.address, ...updates[key] };
                } else {
                    res.user[key] = updates[key];
                }
            }
        });
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
// Deleting one
router.delete('/:id', getUser, async(req, res) => {
    try {
        await res.user.remove()
        res.json({ message: 'Deleted User'})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


async function getUser(req, res, next) { //MIDDLEWARE FUNCTION
    let user //DEFINE VARIABLE THAT WILL BE USED FOR ENDPOINTS
    try {
        user = await User.findById(req.params.id)
        if(user == null) {
            return res.status(404).json({ message: 'Cannot find user'})
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.user = user
    next() //MOVE TO NEXT MIDDLEWARE
}

module.exports = router