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
- `inversify` across controllers, use cases and repositories.
- Context containers:
  - `recipe-catalog/infrastructure/di/recipe-catalog.container.ts`
  - `mission-execution/infrastructure/di/mission-execution.container.ts`
  - `shared-kernel/infrastructure/di/shared-kernel.container.ts`
- Main container loader:
  - `shared-kernel/infrastructure/di/container.ts`
- Composition root in `api-server.ts`

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

Example:
```bash
curl http://localhost:3000/recipes
```
