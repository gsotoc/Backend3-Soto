import { generateRandomUser, generateRandomPet } from "../utils/mocks.js";

export const generateUserMocks = async (req, res) => {
    const mocks = [];
    const count = 50;
    for (let i=0; i<count; i++) {
        mocks.push( await generateRandomUser());
    }
    res.json({status:"success",payload:mocks})
};

export const generatePetMocks = async (req, res) => {
    const mocks = [];
    const count = parseInt(req.body.pets);
    for (let i=0; i<count; i++) {
        mocks.push( await generateRandomPet());
    }   
    res.json({status:"success",payload:mocks})
};


export const generateDataMocks = async (req, res) => {
    const { users, pets } = req.body;
    const usersCreated = [];
    const petsCreated = [];
    const usersCount = parseInt(users);
    const petCount = parseInt(pets);

    for (let i = 0; i < usersCount; i++) {
        const user = await generateRandomUser();
        await user.save();
        usersCreated.push(user);
    };
    
    for (let i = 0; i < petCount; i++) {
        const pet = await generateRandomPet();
        await pet.save();
        petsCreated.push(pet);
    }

    res.json({
        status: "success",
        payload: {  
            users: usersCreated, 
            pets: petsCreated
        }
    })
};

//Genera la cantidad de usuario y mascotas que se le indique, y devuelve los usuarios con sus mascotas
// export const generateDataMocks = async (req, res) => {
//     const { users, pets } = req.body; 
//     const usersCount = parseInt(users);  
//     const petCount = parseInt(pets);
    
//     const createdUsers = await generateRandomUsersWithPets(usersCount, petCount);

//     const populatedUsers = await userModel.find({
//         _id: { $in: createdUsers.map(u => u._id) }
//     }).populate("pets");

//     res.json({
//         status: "success",
//         payload: populatedUsers
//     });
// };