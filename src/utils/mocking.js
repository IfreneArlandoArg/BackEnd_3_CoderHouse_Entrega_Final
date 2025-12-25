import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';

const SALT_ROUNDS = 10;

export async function generateUsers(count = 50) {
    const hashed = await bcrypt.hash('coder123', SALT_ROUNDS);
    const users = [];

    for (let i = 0; i < count; i++) {
        users.push({
            _id: new mongoose.Types.ObjectId(),
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: hashed,
            role: faker.helpers.arrayElement(['user', 'admin']),
            pets: []
        });
    }

    return users;
}

export function generatePets(count = 20, owners = []){
    const pets = [];
    const petSpecies = ['dog', 'cat', 'rabbit', 'parrot', 'hamster', 'turtle'];

    for(let i = 0; i < count; i++){
        pets.push({
            _id: new mongoose.Types.ObjectId(),
            name: faker.animal.dog(),
            specie: faker.helpers.arrayElement(petSpecies),
            birthDate: faker.date.past({ years: 3 }),
            adopted: false,
            owner: owners.length > 0 ? owners[Math.floor(Math.random() * owners.length)]._id : undefined,
            image: ''
        });
    }

    return pets;
}


export default {
    generateUsers,
    generatePets
};