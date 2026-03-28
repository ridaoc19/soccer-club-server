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
├── entity/          # Modelos de TypeORM (tablas de la DB)
├── migration/       # Migraciones de base de datos
├── data-source.ts   # Configuración de conexión con la DB
├── dotenv.ts        # Cargador centralizado de variables de entorno
└── index.ts         # Punto de entrada de la aplicación
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
