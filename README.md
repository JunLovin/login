# Login Page

Login Page es una aplicación de autenticación moderna construida con React, Vite, TailwindCSS y Supabase. Permite a los usuarios registrarse, iniciar sesión y recuperar su cuenta utilizando autenticación tradicional (email/contraseña) y autenticación OAuth con Google.

## Características

- Registro de usuarios con email y contraseña
- Inicio de sesión seguro
- Recuperación de contraseña vía email
- Autenticación con Google (OAuth)
- Interfaz moderna y responsiva
- Backend con Express y Supabase
- Variables de entorno para configuración segura

## Tecnologías utilizadas

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)

## Estructura del proyecto

```
login/
├── public/
├── src/
│   ├── components/
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── LoginCard.tsx
│   │   ├── RecoveryCard.tsx
│   │   └── RegisterCard.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── routes.tsx
├── server.ts
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── .env.example
└── README.md
```

## Configuración

1. **Clona el repositorio:**
   ```sh
   git clone <url-del-repo>
   cd login
   ```
2. **Instala las dependencias:**
   ```sh
   npm install
   ```
3. **Configura las variables de entorno:**
   - Copia el archivo `.env.example` a `.env` y completa los valores de Supabase:
     ```sh
     cp .env.example .env
     # Edita .env con tus claves de Supabase
     ```
4. **Inicia el backend:**
   ```sh
   npm run dev:server
   # o
   npx ts-node server.ts
   ```
5. **Inicia el frontend:**
   ```sh
   npm run dev
   ```

## Uso

- Accede a `http://localhost:5173` para ver la aplicación.
- Puedes registrarte, iniciar sesión, recuperar tu contraseña o usar Google para autenticarte.

## Notas

- Asegúrate de tener configurado correctamente tu proyecto en [Supabase](https://supabase.com/), incluyendo el proveedor de Google OAuth.
- Las rutas principales son:
  - `/` — Login
  - `/register` — Registro
  - `/recovery` — Recuperación de contraseña

## Licencia

Este proyecto es solo para fines educativos y de práctica.