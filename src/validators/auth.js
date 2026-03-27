import Joi from "joi";
import AppError from "../utils/appError.js";

// Схема валидации для регистрации
const registerSchema = Joi.object({
    email: Joi.string().email().required(),     // Email должен быть валидным адресом
    password: Joi.string().min(8).required(),  // Пароль минимум 8 символов
});
// Схема валидации для входа
const loginSchema = Joi.object({
    email: Joi.string().email().required(),     // Email должен быть валидным адресом
    password: Joi.string().min(8).required(),  // Пароль минимум 8 символов
});

// Middleware для валидации входящих данных
export function validate(schema) {
    return (req, res, next) => {
        // Проверка тела запроса по переданной схеме
        const { error } = schema.validate(req.body);
        if (error) {
            // Если ошибка валидации - передаем в обработчик ошибок с кодом 400
            return next(new AppError(error.details[0].message, 400));
        }
        next();
    };
}

export { registerSchema, loginSchema };