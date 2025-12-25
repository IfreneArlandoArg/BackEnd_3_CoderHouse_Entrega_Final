import { Router } from 'express';
import { usersService, petsService } from '../services/index.js';
import mocking from '../utils/mocking.js';

const router = Router();

// GET /api/mocks/mockingusers?amount=50
router.get('/mockingusers', async (req, res) => {
  try {
    const amount = parseInt(req.query.amount) || 50;
    const users = await mocking.generateUsers(amount);
    return res.json(users);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error generating users' });
  }
});

// GET /api/mocks/mockingpets?amount=20
router.get('/mockingpets', (req, res) => {
  try {
    const amount = parseInt(req.query.amount) || 20;
    const pets = mocking.generatePets(amount);
    return res.json(pets);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error generating pets' });
  }
});

// POST /api/mocks/generateData 
router.post('/generateData', async (req, res) => {
  try {
    const usersQty = parseInt(req.body.users) || 0;
    const petsQty = parseInt(req.body.pets) || 0;

    
    let insertedUsers = [];
    if (usersQty > 0) {
      const usersToInsert = await mocking.generateUsers(usersQty);
      const promises = usersToInsert.map(u => usersService.create(u));
      insertedUsers = await Promise.all(promises);
    }

    
    let insertedPets = [];
    if (petsQty > 0) {
      const owners = insertedUsers.length ? insertedUsers : [];
      const petsToInsert = mocking.generatePets(petsQty, owners);
      const promises = petsToInsert.map(p => petsService.create(p));
      insertedPets = await Promise.all(promises);
    }

  
    const createdUsers = usersQty > 0 ? await usersService.getAll({ email: /@mocks\.com$/ }) : [];
    const createdPets = petsQty > 0 ? await petsService.getAll({ name: /_/ }) : [];

    return res.json({ insertedUsers: insertedUsers.length, insertedPets: insertedPets.length, users: createdUsers, pets: createdPets });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error generating and inserting data' });
  }
});

export default router;
