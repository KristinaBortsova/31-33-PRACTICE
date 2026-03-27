import AppError from "../utils/appError.js";
import * as userService from "../services/userService.js";

// Получение списка всех пользователей
export async function getAllUsers(req, res, next) {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}

// Получение пользователя по ID из параметров запроса
export async function getUserById(req, res, next) {
    try {
        const user = await userService.getUserById(req.params.id);
        // Если пользователь не найден - возвращаем ошибку 404
        if (!user) return next(new AppError("Пользователь не найден", 404));
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}