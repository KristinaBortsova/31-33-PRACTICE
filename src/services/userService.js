import {
    getAllUsers as getAllUsersModel,
    findUserById,
} from "../models/user.model.js";

// Получение всех пользователей через модель данных
export async function getAllUsers() {
    return getAllUsersModel();
}

// Получение пользователя по ID через модель данных
export async function getUserById(id) {
    return findUserById(id);
}