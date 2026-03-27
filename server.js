import "dotenv/config";

import app from "./src/app.js";
import config from "./src/config.js";
import db from "./src/db/db.js";

// Функция запуска сервера
const startServer = async () => {
    try {
        // Запуск Express приложения на указанном порту
        app.listen(config.port, () => {
            console.log(`Сервер запущен на http://localhost:${config.port}`);
            console.log(`Документация доступна на http://localhost:${config.port}/api/docs`);
        });
    } catch (err) {
        console.error("Не удалось запустить сервер:", err);
    }
};

// Запуск сервера
startServer();