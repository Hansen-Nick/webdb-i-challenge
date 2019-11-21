const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.post('/api/accounts', (req, res) => {
  accountData = req.body

  db('accounts').insert(accountData).into('accounts')
    .then( accounts => {
      res.status(201).json(accounts)
    })
    .catch(err => {
      res.status(500).json({message: 'That didnt work'})
    })
})

server.get('/api/accounts', (req, res) => {

  db('accounts').select().from('accounts')
    .then( accounts => {
      res.status(200).json(accounts)
    }) 
    .catch( err => {
      res.status(500).json({message: "That didn't work"})
    })
})

server.get('/api/accounts/:id', (req, res) => {
  const {id} = req.params;

  db('accounts').select().where('id', id)
    .then( account => {
      if (account[0]) {
        res.status(200).json(account)
      } else {
        res.status(404).json({message: 'Invalid ID'})
      }
    })
    .catch( err => {
      res.status(500).json({message: 'There was an error with the database'})
    })

})

server.put('/api/accounts/:id', (req, res) => {
  updateData = req.body;
  accountID = req.params.id

  db('accounts').where('id', accountID).update(updateData)
    .then( account => {
      res.status(200).json({message: 'Update successful'})
    })
    .catch(err => {
      res.status(500).json({message: 'Nope try again'})
    })
})

server.delete('/api/accounts/:id', (req, res) => {
  const {id} = req.params;

  db('accounts').where({id}).del()
    .then( account => {
      res.status(200).json({message: 'Deleted!'})
    })
    .catch( err => {
      res.status(500).json({message: 'Database error'})
    })
})

module.exports = server;