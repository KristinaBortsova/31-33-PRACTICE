import crypto from "crypto";

export default function generateSecret(name) {
    // Проверка режима окружения: в production выбрасываем ошибку, чтобы секрет был обязательно задан вручную
    if (process.env.NODE_ENV === "production") {
        throw new Error(`${name} должен быть установлен в переменных окружения в режиме production`);
    }
    // Генерация случайного секрета: 64 случайных байта, преобразованных в hex-строку (128 символов)
    const generated = crypto.randomBytes(64).toString("hex");
    // Вывод предупреждения в консоль о том, что используется автоматически сгенерированный секрет
    console.warn(`[config] ${name} не установлен, используем сгенерированный секрет (только для разработки):`, generated);
    return generated;
}