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

Dependency Injection:
- `inversify` + `inversify-express-utils`
- Controllers with decorators (`@controller`, `@httpGet`, `@httpPost`)
- Context containers:
  - `recipe-catalog/infrastructure/di/recipe-catalog.container.ts`
  - `mission-execution/infrastructure/di/mission-execution.container.ts`
  - `shared-kernel/infrastructure/di/shared-kernel.container.ts`
- Main container loader:
  - `shared-kernel/infrastructure/di/container.ts`
- Composition root in `api-server.ts`

Controller module index pattern:
- `recipe-catalog/infrastructure/controllers/index.ts`
- `mission-execution/infrastructure/controllers/index.ts`
- `shared-kernel/infrastructure/controllers/index.ts`

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
- `POST /recipes`
- `GET /missions/:missionId`
- `POST /missions/:missionId/advance-step`

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

## Tests
```bash
npm test
```

Example:
```bash
curl http://localhost:3000/recipes
```
