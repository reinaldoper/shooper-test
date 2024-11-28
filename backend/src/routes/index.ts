import { Router } from 'express';
import { estimateRide, confirmRide, getRides } from '../controllers/rideController';
import { registerUser } from '../controllers/UserController';
import { loginUser } from '../controllers/AuthController';
import { registerDriver } from '../controllers/DriverController';


const router = Router();

router.post('/ride/estimate', estimateRide);
router.patch('/ride/confirm', confirmRide);
router.get('/ride/:customer_id', getRides);
router.post('/user/register', registerUser);
router.post('/user/login', loginUser);
router.post('/driver', registerDriver);

export default router;