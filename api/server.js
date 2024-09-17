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
        res.status(500).json({ message: 'users information could not be retrieved' })
    })
})

server.get('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user){
            res.status(404).json({ message: "The user with the specified ID does not exist" })
        } else res.status(200).json(user)
    } catch {
        res.status(500).json( {message: "The user information could not be retrieved"} )
    }
})

server.post('/api/users', async (req, res) => {
    try {
        console.log(req.body)
        const userFromClient = req.body
        if(!userFromClient.name || !userFromClient.bio) {
            res.status(400).json({ message: "Please provide name and bio for the user" })
        } else {
            const newUser = await User.insert(req.body)
            res.status(201).json(newUser)
        }
    } catch {
        res.status(500).json({ message: "There was an error while saving the user to the database" })
    }
})

server.delete('/api/users/:id', (req, res) => {
    User.remove(req.params.id)
        .then(deletedUser => {
            if(!deletedUser){
                res.status(404).json({ message: "The user with the specified id does not exist" })
            } else {
                console.log(deletedUser)
                res.status(200).json(deletedUser)
            }
        })
        .catch(() => {
            res.status(500).json({ message: "The user could not be removed" })
        })
})

server.put('/api/users/:id', async (req, res) => {
    try {
        if(!req.body.name || ! req.body.bio){
            res.status(400).json({ message: `Please provide name and bio for this user`})
        } else {
            const updatedUser = await User.update(req.params.id, req.body)
            !updatedUser ? res.status(404).json({ message: "The user with the specified ID does not exist" }) : res.status(200).json(updatedUser)
        } 
    } catch {
        res.status(500).json({ message: "The user information could not be modified" })
    }
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
