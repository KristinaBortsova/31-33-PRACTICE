import swaggerUi from "swagger-ui-express";
import { readFileSync } from "fs";
import { load } from "js-yaml";
import { fileURLToPath } from "url";
import { dirname, resolve, normalize } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const specPath = resolve(__dirname, "openapi.yaml");

// Проверка безопасности пути
if (!normalize(specPath).startsWith(normalize(__dirname))) {
    throw new Error("Невозможно загрузить файл спецификации OpenAPI");
}

// Загрузка OpenAPI спецификации
const spec = load(readFileSync(specPath, "utf8"));

// Экспортируем как swaggerUI для совместимости с app.js
const swaggerUI = swaggerUi;
export { swaggerUI, spec };