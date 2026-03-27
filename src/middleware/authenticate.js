import jwt from "jsonwebtoken";
import config from "../config.js";
import AppError from "../utils/appError.js";

// Middleware для проверки аутентификации пользователя
export default function authenticate(req, res, next) {
    // Извлечение access-токена из cookies
    const token = req.cookies.accessToken;
    if (!token) return next(new AppError("Вы не авторизованы", 401));

    try {
        // Проверка валидности токена и расшифровка payload
        const decoded = jwt.verify(token, config.jwt.secret);
        // Сохранение данных пользователя в объект запроса для дальнейшего использования
        req.user = decoded;
        next();
    } catch (error) {
        return next(new AppError("Недействительный или истёкший токен", 401));
    }
}