import express from "express";
import config from "./config.js";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler.js";
import authRouter from "./routes/auth.js";
import usersRouter from "./routes/users.js";
import { swaggerUI, spec } from "../docs/swagger.js";

const app = express();

// Настройка ограничения количества запросов: 100 запросов за 15 минут
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 минут
    max: 100,                 // максимум 100 запросов
});

// Подключение middleware безопасности и парсинга
app.use(helmet());           // Защитные HTTP-заголовки
app.use(cors(config.cors));  // Настройка CORS
app.use(cookieParser());     // Парсинг cookies
app.use(express.json());     // Парсинг JSON тела запроса
// Маршруты API с ограничением запросов для аутентификации
app.use("/api/auth", limiter, authRouter);
// Маршруты для работы с пользователями
app.use("/api/users", usersRouter);
// Swagger документация API
app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(spec));
// Глобальный обработчик ошибок (должен быть последним)
app.use(errorHandler);

export default app;