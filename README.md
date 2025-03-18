# Ayrton
Ayrton es una aplicación web diseñada para mejorar la gestión del tiempo y la productividad de los usuarios mediante un enfoque basado en tareas, desafíos automáticos y análisis del rendimiento. Inspirada en la disciplina y velocidad de Ayrton Senna, esta herramienta busca optimizar la organización personal y profesional.

## 🚀 Características Principales

### 📌 Módulo de Tareas
- Creación, edición y eliminación de tareas.
- Asignación de prioridades y categorización.
- Organización en listas personalizadas.

### ⏳ Módulo de Priorización
- Reconocimiento de tareas urgentes e importantes.
- Algoritmo inteligente para sugerir prioridades.
- Integración con recordatorios y deadlines.

### 🔔 Módulo de Recordatorios
- Notificaciones push y alertas personalizadas.
- Establecimiento de fechas límite.
- Sincronización con el calendario interno.

### 📅 Módulo de Calendario
- Vista semanal y mensual de tareas y eventos.
- Agregado y gestión de eventos importantes.
- Sincronización con otros módulos de productividad.

### 🏆 Módulo de Desafíos
- Seguimiento automático de streaks de productividad.
- Logros desbloqueables según la constancia del usuario.
- Motivación mediante notificaciones y premios virtuales.

### 📲 Módulo de Notificaciones
- Recordatorios automáticos según la actividad del usuario.
- Confirmaciones de eventos, pagos y tareas completadas.
- Notificaciones push en tiempo real.

### 💳 Módulo de Pasarela de Pagos
- Procesamiento de pagos con tarjetas de crédito y débito.
- Creación y almacenamiento de métodos de pago.
- Historial de pagos y generación automática de facturas electrónicas.
- Reembolsos y gestión de disputas.

### 🛠️ Módulo de Gestión de Usuarios
- Creación y administración de cuentas de usuario.
- Gestión de permisos y roles dentro de la aplicación.
- Registro de actividad y estadísticas personales.

## 🔧 Tecnologías Utilizadas

- **Frontend:** React.js con Tailwind CSS y Next.js.
- **Backend:** Java con Spring Boot.
- **Base de Datos:** PostgreSQL.
- **Servidor de Despliegue:** Vercel.
- **Autenticación y Seguridad:** JWT, OAuth2.

## 📜 Instalación y Configuración

### 🏗️ Estructura del Monorepositorio
El proyecto Ayrton se organiza como un **monorepositorio**, lo que significa que tanto el frontend como el backend están dentro del mismo repositorio, pero en carpetas separadas.

```
/ayrton
  ├── backend/   # Contiene el código del backend con Spring Boot
  ├── frontend/  # Contiene el código del frontend con React y Next.js
  ├── docs/      # Documentación del proyecto
  ├── .gitignore # Configuración para ignorar archivos en Git
  ├── README.md  # Documentación principal
```

### 1️⃣ Clonar el Repositorio
```bash
git clone https://github.com/tu-usuario/ayrton.git
cd ayrton
```

### 2️⃣ Configurar el Backend
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### 3️⃣ Configurar el Frontend
```bash
cd frontend
npm install
npm start
```

## 🤝 Contribuciones

Si deseas contribuir a **Ayrton**, sigue estos pasos:
1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature-nueva-funcionalidad`).
3. Realiza tus cambios y haz un commit (`git commit -m "Descripción del cambio"`).
4. Sube tus cambios (`git push origin feature-nueva-funcionalidad`).
5. Abre un Pull Request.

## 🏅 Licencia

Este proyecto está bajo la **Licencia MIT**, lo que significa que puedes usarlo, modificarlo y distribuirlo libremente.

## 📩 Contacto

Si tienes dudas o sugerencias, contáctanos:
📧 Email: caceresgabriel305@gmail.com
📧 Email: juliancamilorodriguezcamelo21@gmail.com
