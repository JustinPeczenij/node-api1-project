// BUILD YOUR SERVER HERE
const express = require('express');
const User = require('./users/model');

const server = express();

server.use(express.json());
//ROUTES - I think they're called routes

server.get('/api/users', (req, res) => {
    User.find()
        .then(users => {
            console.log(users)
            res.json(users)
        }) 
        .catch (() => {
            res.status(500).json({
                message: 'users information could not be retrieved',
            })
        })
})

server.get('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user){
            res.status(404).json( {message: "the user with the specified ID doesn't exist"} )
        } else res.json(user)
    } catch {
        res.status(500).json( {message: "the user information could not be retrieved"} )
    }
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
