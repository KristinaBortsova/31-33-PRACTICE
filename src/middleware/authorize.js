import AppError from "../utils/appError.js";

// Middleware для проверки прав доступа (ролевая авторизация)
const authorize = (...roles) => {
    return (req, res, next) => {
        // Проверка: входит ли роль пользователя в список разрешенных ролей
        if (!roles.includes(req.user.role)) {
            return next(
                new AppError("У вас нет прав для доступа к этому ресурсу", 403)
            );
        }
        next();
    };
};

export default authorize;