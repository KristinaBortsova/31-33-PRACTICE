// Глобальный обработчик ошибок для Express
const errorHandler = (err, req, res, next) => {
    // Проверка: является ли ошибка ожидаемой (операционной)
    if (err.isOperational) {
        // Для ожидаемых ошибок возвращаем клиенту статус-код и сообщение из ошибки
        return res.status(err.statusCode).json({
            status: "error",
            message: err.message,
        });
    }

    // Для неожиданных ошибок (баги в коде, непредвиденные исключения)
    console.error("Необработанная ошибка:", err);
    
    // Клиенту отправляем общее сообщение, не раскрывая детали реализации
    res.status(500).json({
        status: "error",
        message: "Что-то пошло не так. Пожалуйста, попробуйте позже."
    });
};

export default errorHandler;