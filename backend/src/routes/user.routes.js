import { Router } from "express";
import { registerUser ,loginUser} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
//import { verifyJWT } from "../middlewares/auth.middleware.js";


const router=Router()

router.route("/register").post( registerUser)
router.route("/login").post(loginUser)


export default router