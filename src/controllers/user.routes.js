const express = require('express');
const router = express.Router();
const userRepository = require('../models/user-repository');

// la on recup tous les userd
router.get('/', async (req, res) => {
  res.send(await userRepository.getUsers());
});

//get user
router.get('/:firstName', async (req, res) => {
  const foundUser = await userRepository.getUserByFirstName(req.params.firstName);

  if (!foundUser) {
    res.status(500).send('User not found');
    return;
  }

  res.send(foundUser);
});

//create user
router.post('/', async (req, res) => {
  await userRepository.createUser(req.body);
  res.status(201).end();
});

router.put('/:id', async (req, res) => {
  await userRepository.updateUser(req.params.id, req.body).catch((err) => res.status(500).send(err.message));
  res.status(204).end();
});

router.delete('/:id', async (req, res) => {
  await userRepository.deleteUser(req.params.id);
  res.status(204).end();
});



exports.initializeRoutes = () => router;
