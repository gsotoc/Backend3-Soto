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

export function generateRandomPet(ownerID) {
    const pet = new petModel({

        name: faker.animal.petName(),
        specie: faker.animal.type(),
        birthDate: faker.date.past(),
        adopted: faker.datatype.boolean(),
        owner: ownerID || null,
        image: faker.image.url()
    });

    return pet;
}

//Genera la cantidad de usuario y mascotas que se le indique, y devuelve los usuarios con sus mascotas
// export async function generateRandomUsersWithPets(userCount, petCount) {
//     const usersWithPets = [];

//     for (let i = 0; i < userCount; i++) {
//         const user = await generateRandomUser();

//         for (let j = 0; j < petCount; j++) {
//             const pet = await generateRandomPet(user._id);
//             user.pets.push(pet._id); 
//         }

//         await user.save();

//         usersWithPets.push(user);
//     }

//     return usersWithPets;
// };