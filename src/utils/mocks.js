import { faker } from '@faker-js/faker';
import { createHash } from './index.js';
import userModel from '../dao/models/User.js';
import petModel from '../dao/models/Pet.js';

export async function generateRandomUser() {

    const user = new userModel({
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: await createHash('coder123'),
        role: faker.helpers.arrayElement(['user','admin']),
        pets: []
    });

    return user;
}

export async function generateRandomPet() {
    const pet = new petModel({
        name: faker.animal.petName(),
        specie: faker.animal.type(),
        birthDate: faker.date.past(),
        adopted: false, 
        image: faker.image.url()
    });

    return pet;
}

