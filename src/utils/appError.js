class AppError extends Error {
    constructor(message, statusCode) {
        // Вызов конструктора родительского класса Error с переданным сообщением
        super(message);
        // HTTP статус код ошибки
        this.statusCode = statusCode;
        // Определение статуса: если код начинается с 4 - это ошибка клиента (fail), иначе - ошибка сервера (error)
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
        // Флаг, указывающий на ожидаемую операционную ошибку
        this.isOperational = true;
        // Захват стека вызовов для отладки, исключая конструктор из стека
        Error.captureStackTrace(this, this.constructor);
    }
}
export default AppError;