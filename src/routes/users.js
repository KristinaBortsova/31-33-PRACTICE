import { Router } from "express";
import { getAllUsers, getUserById } from "../controllers/userController.js";
import authenticate from "../middleware/authenticate.js";
import authorize from "../middleware/authorize.js";

const router = Router();

// Для всех маршрутов пользователей применяется аутентификация и проверка роли admin
router.use(authenticate, authorize("admin"));

// Получение списка всех пользователей (доступно только администраторам)
router.get("/", getAllUsers);

// Получение пользователя по ID (доступно только администраторам)
router.get("/:id", getUserById);

export default router;