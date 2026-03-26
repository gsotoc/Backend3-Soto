import supertest from "supertest";
import { expect } from "chai";
import app from "../src/app.js";

const requester = supertest(app);

describe("Adoptions Router - Tests Funcionales", () => {

    let testUserId;
    let testPetId;
    let testAdoptionId;

    // Creamos un usuario y mascota de prueba antes de los tests
    before(async () => {
        // Crear usuario de prueba
        const userRes = await requester.post("/api/sessions/register").send({
            first_name: "Test",
            last_name: "User",
            email: `testuser_${Date.now()}@test.com`,
            password: "test1234"
        });
        testUserId = userRes.body.payload;

        // Crear mascota de prueba
        const petRes = await requester.post("/api/pets").send({
            name: "TestPet",
            specie: "dog",
            birthDate: "2022-01-01"
        });
        testPetId = petRes.body.payload._id;
    });

    // --- GET /api/adoptions ---
    describe("GET /api/adoptions", () => {
        it("Debe retornar todas las adopciones con status success", async () => {
            const res = await requester.get("/api/adoptions");

            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("status", "success");
            expect(res.body).to.have.property("payload");
            expect(res.body.payload).to.be.an("array");
        });
    });

    // --- GET /api/adoptions/:aid ---
    describe("GET /api/adoptions/:aid", () => {
        it("Debe retornar error 404 si la adopción no existe", async () => {
            const fakeId = "000000000000000000000000";
            const res = await requester.get(`/api/adoptions/${fakeId}`);

            expect(res.status).to.equal(404);
            expect(res.body).to.have.property("status", "error");
            expect(res.body).to.have.property("error", "Adoption not found");
        });

        it("Debe retornar la adopción correctamente si existe", async () => {
            // Primero creamos una adopción para luego buscarla
            const adoptionRes = await requester.post(`/api/adoptions/${testUserId}/${testPetId}`);
            expect(adoptionRes.status).to.equal(200);

            // Obtenemos todas las adopciones para conseguir el ID
            const allRes = await requester.get("/api/adoptions");
            const adoption = allRes.body.payload.find(
                a => a.owner === testUserId || a.owner?._id === testUserId
            );
            expect(adoption).to.exist;
            testAdoptionId = adoption._id;

            // Buscamos por ID
            const res = await requester.get(`/api/adoptions/${testAdoptionId}`);
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("status", "success");
            expect(res.body.payload).to.have.property("_id", testAdoptionId);
        });
    });

    // --- POST /api/adoptions/:uid/:pid ---
    describe("POST /api/adoptions/:uid/:pid", () => {
        let freshPetId;

        before(async () => {
            // Creamos una mascota fresca para el test de adopción exitosa
            const petRes = await requester.post("/api/pets").send({
                name: "FreshPet",
                specie: "cat",
                birthDate: "2023-01-01"
            });
            freshPetId = petRes.body.payload._id;
        });

        it("Debe retornar error 404 si el usuario no existe", async () => {
            const fakeUserId = "000000000000000000000000";
            const res = await requester.post(`/api/adoptions/${fakeUserId}/${freshPetId}`);

            expect(res.status).to.equal(404);
            expect(res.body).to.have.property("status", "error");
            expect(res.body.error).to.match(/user not found/i);
        });

        it("Debe retornar error 404 si la mascota no existe", async () => {
            const fakePetId = "000000000000000000000000";
            const res = await requester.post(`/api/adoptions/${testUserId}/${fakePetId}`);

            expect(res.status).to.equal(404);
            expect(res.body).to.have.property("status", "error");
            expect(res.body).to.have.property("error", "Pet not found");
        });

        it("Debe retornar error 400 si la mascota ya fue adoptada", async () => {
            // testPetId ya fue adoptada en el test anterior
            const res = await requester.post(`/api/adoptions/${testUserId}/${testPetId}`);

            expect(res.status).to.equal(400);
            expect(res.body).to.have.property("status", "error");
            expect(res.body).to.have.property("error", "Pet is already adopted");
        });

        it("Debe crear la adopción correctamente", async () => {
            const res = await requester.post(`/api/adoptions/${testUserId}/${freshPetId}`);

            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("status", "success");
            expect(res.body).to.have.property("message", "Pet adopted");
        });
    });

});