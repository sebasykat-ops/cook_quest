# CookQuest

DDD-first foundation for CookQuest.

## Architecture
- `recipe-catalog` bounded context
- `mission-execution` bounded context
- `safety-guidance` bounded context
- `user-progress` bounded context
- `shared-kernel` minimal abstractions only

Each bounded context contains:
- `domain`
- `application`
- `infrastructure`

HTTP endpoints are defined inside each context under:
- `infrastructure/controllers`
- each endpoint has an input schema under `infrastructure/schema`

Dependency Injection:
- `inversify` + `inversify-express-utils`
- Controllers with decorators (`@controller`, `@httpGet`, `@httpPost`)
- Context containers:
  - `recipe-catalog/infrastructure/container/recipe-catalog.container.ts`
  - `mission-execution/infrastructure/container/mission-execution.container.ts`
  - `shared-kernel/infrastructure/container/shared-kernel.container.ts`
- Main container loader:
  - `shared-kernel/infrastructure/container/container.ts`
- Composition root in `api-server.ts`

Controller module index pattern:
- `recipe-catalog/infrastructure/controllers/index.ts`
- `mission-execution/infrastructure/controllers/index.ts`
- `shared-kernel/infrastructure/controllers/index.ts`

Container types per context:
- `recipe-catalog/infrastructure/container/recipe-catalog.container.types.ts`
- `mission-execution/infrastructure/container/mission-execution.container.types.ts`

Path aliases:
- `@shared/*`
- `@recipe-catalog/*`
- `@mission-execution/*`
- `@safety-guidance/*`
- `@user-progress/*`

## DDD Rules (strict)
1. Bounded contexts do not import internals from other contexts.
2. Domain layer has no framework dependency.
3. Communication between contexts must happen via contracts/application layer orchestration.
4. Classes use `UpperCase` naming.
5. Variables and methods use `lowerCase` naming.
6. Files use suffix-based convention like `create-recipe.use-case.ts`, `recipe.repository.ts`, `recipe.entity.ts`.

## Run
```bash
npm install
npm run dev
```

## API Endpoints (v0)
- `GET /health`
- `GET /recipes`
- `GET /recipes/:recipeId/steps`
- `POST /recipes`
- `GET /missions/:missionId`
- `POST /missions/:missionId/advance-step`
- `POST /missions/:missionId/complete-step`
- `POST /missions/:missionId/restart`

## Response Contract
Success:
```json
{ "success": true, "data": {} }
```

Error:
```json
{ "success": false, "error": { "code": "VALIDATION_ERROR", "message": "...", "details": {} } }
```

## Validation and Error Handling
- DTO validation with `zod`
- Global error middleware with domain-aware `AppError`
- 404 route middleware

## Migrations (MySQL)
Ejecuta todas las migraciones pendientes:
```bash
npm run migration:up
```

## Seed (MySQL)
Resetea y puebla completamente la BD con 5 recetas:
```bash
npm run seed
```

Variables de entorno recomendadas:
- `MYSQL_HOST`
- `MYSQL_PORT`
- `MYSQL_USER`
- `MYSQL_PASSWORD`
- `MYSQL_DB`
- `MYSQL_RECIPE_SCHEMA` (default `cookquest_recipe_catalog`)
- `MYSQL_MISSION_SCHEMA` (default `cookquest_mission_execution`)

## Tests
```bash
USE_IN_MEMORY=true npm test
```

Example:
```bash
curl http://localhost:3000/recipes
```
