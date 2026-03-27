import bcrypt from "bcryptjs";
import crypto from "crypto";
import AppError from "../utils/appError.js";
import { findUserByEmail, createUser, saveRefreshToken, findRefreshToken, deleteRefreshToken, findUserById } from "../models/user.model.js";
import config from "../config.js";
import jwt from "jsonwebtoken";

// Регистрация нового пользователя
export async function register(email, password) {
    // Проверка: не занят ли email
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
        throw new AppError("Электронный адрес уже используется.", 400);
    }
    // Хеширование пароля с солью (коэффициент работы 12)
    const passwordHash = await bcrypt.hash(password, 12);
    // Создание пользователя с ролью "user" по умолчанию
    return await createUser(email, passwordHash, "user");
}

// Вход пользователя в систему
export async function login(email, password) {
    // Поиск пользователя по email
    const user = await findUserByEmail(email);
    if (!user) {
        throw new AppError("Неверный электронный адрес или пароль.", 401);
    }
    // Сравнение введенного пароля с хешем из базы
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
        throw new AppError("Неверный электронный адрес или пароль.", 401);
    }
    return user;
}

// Генерация нового refresh-токена
export async function generateRefreshToken(userId) {
    // Генерация случайного токена (64 байта в hex)
    const rawToken = crypto.randomBytes(64).toString("hex");
    // Вычисление SHA-256 хеша для хранения в базе
    const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");
    // Время истечения токена (7 дней)
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    // Сохранение хеша токена в базу
    await saveRefreshToken(userId, tokenHash, expiresAt);
    return rawToken;
}

// Ротация refresh-токена (одноразовое использование)
export async function rotateRefreshToken(rawToken) {
    // Вычисление хеша предъявленного токена
    const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");
    // Поиск токена в базе
    const stored = await findRefreshToken(tokenHash);

    // Проверка существования и срока действия токена
    if (!stored || new Date(stored.expires_at) < new Date()) {
        throw new AppError("Недействительный или истёкший токен обновления", 401);
    }

    // Удаление старого токена (одноразовость)
    await deleteRefreshToken(tokenHash);

    // Поиск пользователя по ID из токена
    const user = await findUserById(stored.user_id);
    if (!user) throw new AppError("Пользователь не найден", 401);

    // Генерация нового access-токена с id и ролью пользователя
    const accessToken = jwt.sign(
        { id: user.id, role: user.role },
        config.jwt.secret,
        { expiresIn: config.jwt.accessExpiresIn }
    );

    // Генерация нового refresh-токена
    const newRawRefreshToken = await generateRefreshToken(user.id);

    return { accessToken, refreshToken: newRawRefreshToken };
}

// Отзыв refresh-токена (при выходе из системы)
export async function revokeRefreshToken(rawToken) {
    // Вычисление хеша токена
    const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");
    // Удаление токена из базы
    await deleteRefreshToken(tokenHash);
}