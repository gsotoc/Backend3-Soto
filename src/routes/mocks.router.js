import { Router } from "express";
import { generateUserMocks, generatePetMocks, generateDataMocks } from "../controllers/mocks.controller.js";

const router = Router();

router.get('/mockingusers', generateUserMocks);
router.get('/mockingpets/:num', generatePetMocks);

router.post('/generateData', generateDataMocks);

export default router;