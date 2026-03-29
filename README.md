# ⚽ Soccer Club Server

Backend robusto para el sitio web oficial del club de fútbol. Construido con **Express + TypeScript + TypeORM**.

---

## 📋 Índice

- [Tecnologías](#-tecnologías)
- [Instalación](#-instalación)
- [Scripts disponibles](#-scripts-disponibles)
- [Configuración de Base de Datos](#-configuración-de-base-de-datos)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Linting y Formateo](#-linting-y-formateo)
- [Pruebas post-commit](#-pruebas-post-commit)

---

## 🛠 Tecnologías

| Herramienta | Versión | Rol                                 |
| ----------- | ------- | ----------------------------------- |
| Node.js     | ^20     | Entorno de ejecución                |
| Express     | ^5      | Framework web                       |
| TypeScript  | ^5.9    | Tipado estático                     |
| TypeORM     | ^0.3    | ORM para interactuar con PostgreSQL |
| PostgreSQL  | ^16     | Base de datos relacional            |
| Zod         | ^4      | Validación de esquemas y DTOs       |
| JWT         | ^9      | Autenticación basada en tokens      |
| BcryptJS    | ^3      | Encriptación de contraseñas         |

---

## 🚀 Instalación

1. Clona el repositorio e instala dependencias:

   ```bash
   npm install
   ```

2. Configura tu entorno:

   ```bash
   cp .env.example .env
   ```

   _Edita `.env` con tus credenciales de PostgreSQL._

3. Levanta el servidor:
   ```bash
   npm run dev
   ```

---

## 📦 Scripts disponibles

```bash
# Desarrollo
npm run dev               # Inicia el servidor con nodemon y ts-node

# Build y Producción
npm run build             # Compila TypeScript a JavaScript (.js) en la carpeta /build
npm run serve             # Arranca el servidor ya compilado (usar en producción)

# Linting y Formateo
npm run lint              # Ejecuta ESLint sobre src/
npm run lint:fix          # Corrige errores de estilo automáticamente
npm run format            # Formatea archivos .ts con Prettier

# Base de Datos (TypeORM)
npm run typeorm           # Acceso rápido a las herramientas de TypeORM CLI
```

---

## 🗄 Configuración de Base de Datos

Este servidor utiliza **PostgreSQL**. Las entidades se encuentran en `src/entity/` y TypeORM maneja automáticamente la sincronización de esquemas o migraciones configuradas en `data-source.ts`.

---

## 📁 Estructura del Proyecto

```
src/

├── app/
│   ├── app.ts
│   ├── server.ts
│   ├── routes.ts
│   └── container.ts
│
├── config/
│   ├── database.ts
│   ├── env.ts
│   ├── jwt.ts
│   └── logger.ts
│
├── core/
│   ├── base/
│   │   ├── base.controller.ts
│   │   ├── base.service.ts
│   │   ├── base.repository.ts
│   │   └── router.factory.ts
│   │
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   ├── role.middleware.ts
│   │   ├── upload.middleware.ts
│   │   └── validation.middleware.ts
│   │
│   ├── utils/
│   │   ├── pagination.ts
│   │   ├── filters.ts
│   │   └── response.ts
│
├── modules/
│
│   ├── users/                  🔐 Usuario & Seguridad
│   │   ├── domain/
│   │   │   ├── user.entity.ts
│   │   │   ├── role.entity.ts
│   │   │   ├── notification.entity.ts
│   │   │   └── user-role.entity.ts
│   │   │
│   │   ├── application/
│   │   │   ├── create-user.usecase.ts
│   │   │   ├── login.usecase.ts
│   │   │   ├── assign-role.usecase.ts
│   │   │   └── get-user-profile.usecase.ts
│   │   │
│   │   ├── infrastructure/
│   │   │   ├── users.repository.ts
│   │   │   ├── users.controller.ts
│   │   │   ├── users.routes.ts
│   │   │   └── users.mapper.ts
│   │   │
│   │   └── users.module.ts
│
│   ├── club/                   ⚽ Estructura Club
│   │   ├── domain/
│   │   │   ├── club.entity.ts
│   │   │   ├── team.entity.ts
│   │   │   ├── player.entity.ts
│   │   │   ├── coach.entity.ts
│   │   │   └── player-team.entity.ts
│   │   │
│   │   ├── application/
│   │   │   ├── create-club.usecase.ts
│   │   │   ├── create-team.usecase.ts
│   │   │   ├── add-player-to-team.usecase.ts
│   │   │   ├── assign-coach.usecase.ts
│   │   │   └── get-club-structure.usecase.ts
│   │   │
│   │   ├── infrastructure/
│   │   │   ├── club.repository.ts
│   │   │   ├── club.controller.ts
│   │   │   ├── club.routes.ts
│   │   │   └── club.mapper.ts
│   │   │
│   │   └── club.module.ts
│
│   ├── competitions/           🏆 Competición
│   │   ├── domain/
│   │   │   ├── league.entity.ts
│   │   │   ├── season.entity.ts
│   │   │   ├── match.entity.ts
│   │   │   ├── standings.entity.ts
│   │   │   ├── statistics.entity.ts
│   │   │   └── match-player.entity.ts
│   │   │
│   │   ├── application/
│   │   │   ├── create-league.usecase.ts
│   │   │   ├── create-season.usecase.ts
│   │   │   ├── create-match.usecase.ts
│   │   │   ├── update-standings.usecase.ts
│   │   │   └── get-season-table.usecase.ts
│   │   │
│   │   ├── infrastructure/
│   │   │   ├── competitions.repository.ts
│   │   │   ├── competitions.controller.ts
│   │   │   ├── competitions.routes.ts
│   │   │   └── competitions.mapper.ts
│   │   │
│   │   └── competitions.module.ts
│
│   ├── content/                🗞️ Noticias y contenido
│   │   ├── domain/
│   │   │   ├── news.entity.ts
│   │   │   ├── comment.entity.ts
│   │   │   ├── image.entity.ts
│   │   │   └── news-image.entity.ts
│   │   │
│   │   ├── application/
│   │   │   ├── create-news.usecase.ts
│   │   │   ├── add-comment.usecase.ts
│   │   │   ├── upload-image.usecase.ts
│   │   │   └── get-news-detail.usecase.ts
│   │   │
│   │   ├── infrastructure/
│   │   │   ├── content.repository.ts
│   │   │   ├── content.controller.ts
│   │   │   ├── content.routes.ts
│   │   │   └── content.mapper.ts
│   │   │
│   │   └── content.module.ts
│
│   ├── sponsors/               🤝 Patrocinadores
│   │   ├── domain/
│   │   │   ├── sponsor.entity.ts
│   │   │   ├── club-sponsor.entity.ts
│   │   │   ├── team-sponsor.entity.ts
│   │   │   └── contract.entity.ts
│   │   │
│   │   ├── application/
│   │   │   ├── create-sponsor.usecase.ts
│   │   │   ├── assign-sponsor-to-club.usecase.ts
│   │   │   ├── assign-sponsor-to-team.usecase.ts
│   │   │   └── get-sponsors.usecase.ts
│   │   │
│   │   ├── infrastructure/
│   │   │   ├── sponsors.repository.ts
│   │   │   ├── sponsors.controller.ts
│   │   │   ├── sponsors.routes.ts
│   │   │   └── sponsors.mapper.ts
│   │   │
│   │   └── sponsors.module.ts
│
│   ├── social/                 ❤️ Interacción social
│   │   ├── domain/
│   │   │   ├── like.entity.ts
│   │   │   ├── favorite.entity.ts
│   │   │   ├── report.entity.ts
│   │   │   └── user-interaction.entity.ts
│   │   │
│   │   ├── application/
│   │   │   ├── like-news.usecase.ts
│   │   │   ├── add-favorite.usecase.ts
│   │   │   ├── report-content.usecase.ts
│   │   │   └── get-user-interactions.usecase.ts
│   │   │
│   │   ├── infrastructure/
│   │   │   ├── social.repository.ts
│   │   │   ├── social.controller.ts
│   │   │   ├── social.routes.ts
│   │   │   └── social.mapper.ts
│   │   │
│   │   └── social.module.ts
│
└── database/
    ├── migrations/
    ├── seeds/
    └── data-source.ts
```

---

## 🔍 Linting y Formateo

### ESLint (Backend Rules)

```bash
npm run lint        # Ver errores
npm run lint:fix    # Corregir automáticamente
```

Configurado en `eslint.config.mjs`. Enfocado en:

- Strict TypeScript rules.
- Mejores prácticas de Node.js.
- Prevención de fugas de memoria y promesas mal manejadas (`no-misused-promises`).

### Prettier

```bash
npm run format    # Formatea archivos .ts
```

Reglas: `singleQuote`, `tabWidth: 2`, `printWidth: 120`.

---

## 🪝 Pruebas post-commit

Al igual que en el cliente, este repositorio usa **Husky + lint-staged**. Antes de cada `git commit`, se validan automáticamente todos los archivos `.ts` modificados para garantizar que el código enviado al repositorio sea de alta calidad.
