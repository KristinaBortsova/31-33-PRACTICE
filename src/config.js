import "dotenv/config";
import generateSecret from "./utils/generateSecret.js";

const config = {
    // Порт сервера: из переменных окружения или 3000 по умолчанию
    port: process.env.PORT || 3000,

    // Конфигурация JWT токенов
    jwt: {
        // Секретный ключ для подписи токенов: из .env или автоматическая генерация (только для разработки)
        secret: process.env.JWT_SECRET || generateSecret("JWT_SECRET"),
        // Время жизни access-токена (короткий)
        accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
        // Время жизни refresh-токена (долгий)
        refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
    },

    // Настройки cookie для хранения токенов
    cookie: {
        // Отправка cookie только по HTTPS
        secure: process.env.COOKIE_SECURE === "true",
        // Защита от CSRF: cookie отправляются только с запросами с того же сайта
        sameSite: "strict",
        // Запрет доступа к cookie через JavaScript
        httpOnly: true,
        // Время жизни refresh-токена в миллисекундах (7 дней)
        maxAgeRefresh: 7 * 24 * 60 * 60 * 1000,
    },

    // Настройки CORS для работы с фронтендом
    cors: {
        // Разрешенный источник запросов
        origin: process.env.CORS_ORIGIN || "http://localhost:5173",
        // Разрешение отправки cookie и заголовков авторизации
        credentials: true,
    },

    // Настройки базы данных SQLite
    db: {
        // Путь к файлу базы данных
        path: process.env.DB_PATH || "./database.db",
    },

    // Текущее окружение: development или production
    nodeEnv: process.env.NODE_ENV || "development",
};

export default config;