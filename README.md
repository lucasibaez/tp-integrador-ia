# 📋 TP Integrador - Sistema de Gestión de Participantes
LUCAS IBAÑEZ UNICO INTEGRANTE DEL GRUPO 
> Aplicación web full stack para gestión de participantes de eventos tecnológicos, con autenticación JWT y control de roles (ADMIN / CONSULTA).

---

## 🚀 Demo en vivo

- **Frontend (Vercel):** [https://tp-integrador-ia.vercel.app](https://tp-integrador-ia.vercel.app)
- **Backend (Render):** [https://tp-integrador-ia.onrender.com](https://tp-integrador-ia.onrender.com)



---

## 📖 Descripción del proyecto

Sistema que permite:
- **ADMIN:** Crear, editar, eliminar y ver participantes
- **CONSULTA:** Solo visualizar la lista de participantes

Cada participante tiene:
- Nombre, email, edad, país
- Modalidad (Presencial / Virtual / Híbrido)
- Tecnologías (React / Angular / Vue)
- Nivel (Principiante / Intermedio / Avanzado)
- Aceptación de términos

---

## 🛠️ Tecnologías utilizadas

| Capa | Tecnologías |
|------|-------------|
| **Frontend** | React, TypeScript, Tailwind CSS, Vite, React Router DOM |
| **Backend** | FastAPI, SQLAlchemy, SQLite, JWT, Uvicorn |
| **Despliegue** | Vercel (Frontend), Render (Backend) |
| **Control de versiones** | Git + GitHub |

---

## 🤖 Herramientas de IA utilizadas

| Herramienta | Uso |
|-------------|-----|
| **Gemini CLI + Open Design** | Generación inicial del esqueleto de la app |
| **ChatGPT-4** | Depuración de errores (botón confirmar, CORS, puertos) |
| **GitHub Copilot** | Autocompletado de componentes React y hooks |

### Mejor prompt utilizado
> *"Implementar autenticación JWT en el backend con FastAPI. Los endpoints /participantes (GET, POST, PUT, DELETE) deben estar protegidos. Solo usuarios con rol ADMIN pueden crear, editar y eliminar. Los usuarios con rol CONSULTA solo pueden leer. El token debe expirar en 60 minutos. Las contraseñas deben guardarse hasheadas con bcrypt. Incluir middleware CORS configurado."*

**Por qué funcionó:** El prompt era específico, enumeraba acciones concretas y definía el comportamiento esperado.
### Segundo mejor prompt utilizado
> *"Crear las siguientes páginas en React con React Router Dom: /login (formulario de autenticación), / (Home con listado de participantes solo visible con sesión activa), /nuevo (formulario para crear participante solo ADMIN), /editar/:id (formulario para editar solo ADMIN), /publica (página pública sin autenticación). El navbar debe mostrar opciones diferentes según el rol. Implementar PrivateRoute que redirija a /login si no hay token."*

### Error común de la IA
La IA generaba URLs con `localhost:8000` en lugar de usar variables de entorno, lo que causaba problemas de conexión entre Vercel y Render. Tuve que modificar manualmente los fetch apuntando a la URL de Render.

### Lección aprendida
> *"Siempre especificar que las URLs deben ser configurables mediante variables de entorno para evitar problemas al desplegar."*
> IMPORTANTE:
Instruccione para el profesor:
Abrir el link: https://tp-integrador-ia.vercel.app

Iniciar sesión con:

Usuario: admin (minusculas)

Contraseña: 123

Ahora puede:

Crear participantes (con tecnologías, modalidad, nivel)

Editar

Eliminar

Filtrar por nombre 

Si inicia sesión con user  (minusculas) / Contraseña: 123, solo puede VER la lista (rol consulta).

El backend está online en Render, todo funciona sin necesidad de instalar nada localmente."
---
