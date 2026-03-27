import { validate, registerSchema, loginSchema } from "../validators/auth.js";
import { register, login, refresh, logout } from "../controllers/authController.js";
import authenticate from "../middleware/authenticate.js";
import { Router } from "express";

const router = Router();

// Маршрут регистрации: валидация данных -> контроллер регистрации
router.post("/register", validate(registerSchema), register);

// Маршрут входа: валидация данных -> контроллер входа
router.post("/login", validate(loginSchema), login);

// Маршрут обновления токенов: получение refresh-токена из cookies -> контроллер обновления
router.post("/refresh", refresh);

// Маршрут выхода: проверка аутентификации -> контроллер выхода
router.post("/logout", authenticate, logout);

export default router;